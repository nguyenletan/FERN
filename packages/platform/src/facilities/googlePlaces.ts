export type GooglePlaceData = {
  id?: string;
  displayName?: string;
  formattedAddress?: string;
  addressComponents?: { longText: string; shortText?: string; types: string[] }[];
};
export function googleAddress(place: GooglePlaceData) {
  const component = (type: string) =>
    place.addressComponents?.find((c) => c.types.includes(type))?.longText ?? "";
  return {
    name: place.displayName ?? "",
    location: place.formattedAddress ?? "",
    buildingNumber: component("street_number"),
    street: component("route"),
    postcode: [component("postal_code"), component("postal_code_suffix")].filter(Boolean).join("-"),
    city: component("locality") || component("postal_town"),
    state: component("administrative_area_level_1"),
    country: component("country"),
    googlePlaceId: place.id ?? "",
  };
}
interface Place extends GooglePlaceData {
  fetchFields(options: { fields: string[] }): Promise<unknown>;
}
export interface SelectionEvent extends Event {
  placePrediction: { toPlace(): Place };
}
interface MapsApi {
  importLibrary(name: string): Promise<{ PlaceAutocompleteElement: new () => HTMLElement }>;
}
type MapsWindow = Window & {
  google?: { maps: MapsApi };
  fernGoogleReady?: () => void;
  gm_authFailure?: () => void;
};
let loading: Promise<MapsApi> | undefined;
export function loadGooglePlaces(key: string): Promise<MapsApi> {
  const w = window as MapsWindow;
  if (w.google?.maps?.importLibrary) return Promise.resolve(w.google.maps);
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    let settled = false;
    const fail = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(
        Error(
          "Google could not connect. Check the key, enabled APIs, billing and website restrictions, then refresh FERN to retry.",
        ),
      );
    };
    const timer = setTimeout(fail, 20000);
    w.fernGoogleReady = () => {
      if (settled) return;
      if (!w.google?.maps) {
        fail();
        return;
      }
      settled = true;
      clearTimeout(timer);
      resolve(w.google.maps);
    };
    w.gm_authFailure = () => {
      window.dispatchEvent(new Event("fern-google-auth-error"));
      fail();
    };
    script.src =
      "https://maps.googleapis.com/maps/api/js?" +
      new URLSearchParams({
        key,
        loading: "async",
        libraries: "places",
        v: "weekly",
        callback: "fernGoogleReady",
      });
    script.async = true;
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return loading;
}
