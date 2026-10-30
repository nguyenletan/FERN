import {resourceDestinations} from "./resourceDestinations.ts";
import {homeApplications} from "./homeApplications.ts";
import {applicationIcons} from "./HomeApplications.tsx";
import { useEffect, useRef, type ReactNode } from "react";
import {
  CaretDown,
  Compass,
  ArrowsLeftRight,
  BookOpen,
  ChartLineUp,
  ClipboardText,
  FileText,
  House,
  List,
  Question,
  ShieldCheck,
  UsersThree,
  X,
  SignOut,
} from "@phosphor-icons/react";
import fern from "../../../../../packages/platform/src/assets/home-fern.png";
export type HomePanel = "about" | "facility" | "guide" | "learn" | "reference" | "help" | "updates" | null;
export function HomeHeader({
  currentPanel = null,
  currentPage = "Home",
  open,
  toggle,
  onPanel,
  onHome,
}: {
  currentPanel?: HomePanel;
  currentPage?: string;
  open: boolean;
  toggle: () => void;
  onPanel: (p: HomePanel) => void;
  onHome: () => void;
}) {
  return (
    <header className="fern-home-header">
      <button
        onClick={toggle}
        aria-expanded={open}
        aria-controls={currentPage==="Home"?"fern-home-sidebar":"fern-workspace-sidebar"}
        aria-label={open ? "Hide navigation" : "Show navigation"}
      >
        <List size={23} />
        <span>Menu</span>
      </button>
      <a className="fern-wordmark" href="#home" onClick={e=>{e.preventDefault();onHome();}} aria-label="FERN home" title="Go to FERN Home">
        <strong>FERN</strong>
        <img src={fern} alt="" />
        <small>
          Facility Expert
          <br />
          Reference Network
        </small>
      </a>
      <nav aria-label="Homepage sections">
        <a className={!currentPanel && currentPage==="Home" ? "selected" : undefined} aria-current={!currentPanel && currentPage==="Home" ? "page" : undefined} href="#home" onClick={e=>{e.preventDefault();onHome();}}>
          Home
        </a>
        <button className={currentPanel==="learn"?"selected":undefined} aria-current={currentPanel==="learn"?"page":undefined} onClick={() => onPanel("learn")}>Learn</button>
        <button className={currentPanel==="reference"?"selected":undefined} aria-current={currentPanel==="reference"?"page":undefined} onClick={() => onPanel("reference")}>Reference library</button>
        <button className={currentPanel==="help"?"selected":undefined} aria-current={currentPanel==="help"?"page":undefined} onClick={() => onPanel("help")}>Help</button>
      </nav>
    </header>
  );
}
export function SidebarGroup({id,title,open,onToggle,children}:{id:string;title:string;open:boolean;onToggle:()=>void;children:ReactNode}) {
 return <section className="fern-sidebar-group"><h2><button type="button" onClick={onToggle} aria-expanded={open} aria-controls={id}><span>{title}</span><CaretDown size={17} aria-hidden="true" className={open?'is-expanded':''}/></button></h2><div id={id} hidden={!open}>{children}</div></section>;
}
export function HomeSidebar({
  currentPanel = null,
  expandedGroups,
  onToggleGroup,
  open,
  close,
  onNavigate,
  onPanel,
  onSignOut,
  onHome,
  mobile,
}: {
  currentPanel?: HomePanel;
  open: boolean;
  expandedGroups: Record<string,boolean>;
  onToggleGroup: (group:string) => void;
  close: () => void;
  onNavigate: (s: string) => void;
  onPanel: (p: HomePanel) => void;
  onSignOut: () => void;
  onHome: () => void;
  mobile: boolean;
}) {
  const sidebar = useRef<HTMLElement>(null);
  const dismiss = () => {
    close();
    requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(".fern-home-header>button")?.focus());
  };
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss();
      }
      if (e.key === "Tab" && mobile) {
        const items = Array.from(sidebar.current?.querySelectorAll<HTMLElement>("button:not([disabled]),a[href]") ?? []).filter(item => item.getClientRects().length > 0);
        if (!items?.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && (document.activeElement === first || !sidebar.current?.contains(document.activeElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || !sidebar.current?.contains(document.activeElement))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const frame = mobile ? requestAnimationFrame(() => sidebar.current?.querySelector<HTMLButtonElement>("button")?.focus()) : null;
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [open, close, mobile]);
  const go = (s: string) => {
    onNavigate(s);
    if (window.innerWidth < 900) close();
  };
  const panel = (p: HomePanel) => {
    onPanel(p);
    if (window.innerWidth < 900) close();
  };
  return (
    <>
      {open && (
        <button className="fern-menu-backdrop" aria-label="Close navigation" onClick={dismiss} />
      )}
      <aside
        ref={sidebar}
        id="fern-home-sidebar"
        className={"fern-home-sidebar " + (open ? "is-open" : "")}
        role={mobile ? "dialog" : undefined}
        aria-modal={mobile && open ? true : undefined}
        aria-label="FERN navigation menu"
        inert={!open}
      >
        <button className="fern-close-menu" onClick={dismiss}>
          <X size={18} />
          Close menu
        </button>
        <nav aria-label="FERN navigation">
          <a
            href="#home"
            className={!currentPanel?"current":undefined}
            aria-current={!currentPanel?"page":undefined}
            onClick={event => {
              event.preventDefault();
              onHome();
            }}
          >
            <House size={19} />
            Home
          </a>
          <SidebarGroup id="fern-home-workspace-items" title="Workspace" open={!!expandedGroups["Workspace"]} onToggle={()=>onToggleGroup("Workspace")}><button onClick={() => go("Workspace")}><House size={19}/>Explore Workspace</button>
          <button onClick={() => go("Mission & Pillars")}><Compass size={19}/>Mission &amp; Pillars</button>
          {[
            ["Leadership & Policy", "Leadership & Policy"],
            ["FM Overview", "FM Overview"],
            ["Planning & Objectives", "Planning & Objectives"],
            ["Performance & KPIs", "Performance & KPIs"],
            ["Risk & Compliance", "Risk & Compliance"],
            ["Audit & Assurance", "Audit & Assurance"],
            ["Continual Improvement", "Continual Improvement"],
          ].map(([dest, label], i) => {
            const Icon = [UsersThree, House, ClipboardText, ChartLineUp, ShieldCheck, FileText, ArrowsLeftRight][i];
            return (
              <button key={dest} onClick={() => go(dest)}>
                <Icon size={19} />
                {label}
              </button>
            );
          })}
          </SidebarGroup><SidebarGroup id="fern-home-app-items" title="FERN Apps" open={!!expandedGroups["FERN Apps"]} onToggle={()=>onToggleGroup("FERN Apps")}>
          {homeApplications.map((app,i)=>{const Icon=applicationIcons[i]??ClipboardText;return <button key={app.name} disabled title="Coming soon to the FERN website"><Icon size={19}/>{app.title}<span className="fern-coming-soon">Soon</span></button>;})}
          </SidebarGroup><SidebarGroup id="fern-home-resource-items" title="Resources & Help" open={!!expandedGroups["Resources & Help"]} onToggle={()=>onToggleGroup("Resources & Help")}>
          {resourceDestinations.map(item=><button key={item.label} className={currentPanel===item.panel?"current":undefined} aria-current={currentPanel===item.panel?"page":undefined} onClick={()=>panel(item.panel)}><BookOpen size={19}/>{item.label}</button>)}
          </SidebarGroup><SidebarGroup id="fern-home-support-items" title="Support" open={!!expandedGroups["Support"]} onToggle={()=>onToggleGroup("Support")}>
          <button onClick={() => panel("help")}>
            <Question size={19} />
            Help
          </button>
          </SidebarGroup>
          <button className="fern-sidebar-signout" onClick={onSignOut}>
            <SignOut size={19} />
            Sign out
          </button>
        </nav>
      </aside>
    </>
  );
}
