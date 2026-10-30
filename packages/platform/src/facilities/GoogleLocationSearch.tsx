import { useEffect, useRef, useState } from "react";
import { googleAddress, loadGooglePlaces, type SelectionEvent } from "./googlePlaces.ts";
export default function GoogleLocationSearch({
  onSelect,
}: {
  onSelect: (address: ReturnType<typeof googleAddress>) => void;
}) {
  const [key, setKey] = useState(""),
    [state, setState] = useState("Enter the approved Google Maps browser API key to connect."),
    [busy, setBusy] = useState(false),
    [connected, setConnected] = useState(false);
  const host = useRef<HTMLDivElement>(null),
    alive = useRef(true),
    generation = useRef(0),
    callback = useRef(onSelect);
  callback.current = onSelect;
  useEffect(() => {
    alive.current = true;
    const fail = () => {
      setState(
        "Google rejected the connection. Check API activation, billing and allowed websites. Refresh FERN after correcting the configuration.",
      );
      setConnected(false);
      setBusy(false);
      host.current?.replaceChildren();
    };
    window.addEventListener("fern-google-auth-error", fail);
    return () => {
      alive.current = false;
      generation.current++;
      window.removeEventListener("fern-google-auth-error", fail);
      host.current?.replaceChildren();
    };
  }, []);
  async function connect() {
    if (!key.trim()) return;
    setBusy(true);
    setState("Connecting to Google…");
    try {
      const maps = await loadGooglePlaces(key.trim());
      const { PlaceAutocompleteElement } = await maps.importLibrary("places");
      if (!alive.current) return;
      const widget = new PlaceAutocompleteElement();
      widget.setAttribute("placeholder", "Building name, address or postcode");
      widget.setAttribute("aria-label", "Search Google for a building");
      widget.style.width = "100%";
      widget.addEventListener("gmp-error", () => {
        if (alive.current)
          setState(
            "Google search is unavailable. Check the connection configuration or use manual entry.",
          );
      });
      widget.addEventListener("gmp-select", async (event) => {
        const request = ++generation.current;
        try {
          setState("Loading the selected building details…");
          const place = (event as SelectionEvent).placePrediction.toPlace();
          await place.fetchFields({
            fields: ["id", "displayName", "formattedAddress", "addressComponents"],
          });
          if (!alive.current || request !== generation.current) return;
          callback.current(googleAddress(place));
        } catch {
          if (alive.current && request === generation.current)
            setState("Could not retrieve that building. Choose another result or try again.");
        }
      });
      host.current?.replaceChildren(widget);
      setConnected(true);
      setKey("");
      setState(
        "Google search connected. Type a building name, address or postcode and select a suggestion.",
      );
    } catch (e) {
      if (alive.current) setState((e as Error).message);
    } finally {
      if (alive.current) setBusy(false);
    }
  }
  return (
    <section className="space-y-3" aria-label="Google location search">
      <h3 className="text-lg font-semibold">Find a building with Google</h3>
      <p className="text-sm">
        Only searches typed here are sent to Google. Your internal facility history is not sent.
      </p>
      {!connected && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void connect();
          }}
          className="space-y-2"
        >
          <label className="block">
            Google Maps browser API key
            <input
              type="password"
              autoComplete="off"
              className="block border rounded-lg p-3 w-full"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              disabled={busy}
            />
          </label>
          <p className="text-sm text-slate-600">
            Use a key restricted to this website with Maps JavaScript API and Places API (New)
            enabled. It is used in this page session, not saved in facility records or the source
            ZIP. Browser keys are visible to the browser and must be restricted.
          </p>
          <button
            className="bg-blue-800 text-white rounded-lg px-4 py-2 disabled:opacity-50"
            disabled={!key.trim() || busy}
          >
            Connect Google search
          </button>
        </form>
      )}
      <p role="status">{state}</p>
      <div ref={host} />
      <p className="text-sm">
        Choose the exact building; a postcode may cover several. Returned address fields will open
        for review. Site code, facility type and operational data still require your input.
      </p>
    </section>
  );
}
