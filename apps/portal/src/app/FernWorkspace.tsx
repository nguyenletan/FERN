import SiteFooter from '../features/dashboard/SiteFooter';
import {SearchNavigation} from '../features/search/FernAISearch';
import MissionPillars from '../features/framework/MissionPillars';
import IntegratedWorkspace from '../features/framework/IntegratedWorkspace';
import {readPortalRoute,portalLocation,type PortalRoute} from './portalRoutes';
import {appsEnabled,integratedApp,IntegratedAppView} from './integratedApps.tsx';
import { homeApplications } from "../features/dashboard/homeApplications.ts";
import {resourceDestinations,legacyResourcePanels} from "../features/dashboard/resourceDestinations.ts";
import WorkspaceIndex from "../features/overview/WorkspaceIndex.tsx";
import './home-return.css';
import FmOverviewPage from '../features/overview/FmOverviewPage.tsx';
import ContinualImprovementPage from '../features/improvement/ContinualImprovementPage.tsx';
import AuditAssurancePage from '../features/audit/AuditAssurancePage.tsx';
import RiskCompliancePage from '../features/risk/RiskCompliancePage.tsx';
import PerformanceKpiPage from '../features/performance/PerformanceKpiPage.tsx';
import PlanningObjectivesPage from '../features/planning/PlanningObjectivesPage.tsx';
import LeadershipPolicyPage from '../features/leadership/LeadershipPolicyPage.tsx';
import React, { useEffect, useRef, useState } from "react";
import { navGroups } from "./navigation.tsx";
import {HomeHeader,HomeSidebar,type HomePanel} from "../features/dashboard/HomeNavigation.tsx";
import DashboardPage from "../features/dashboard/DashboardPage.tsx";
import fernAiMascot from "../../../../packages/platform/src/assets/ChatGPT_Image_Sep_4__2026__11_17_37_AM.png";
import DataSourceBadge from "../../../../packages/platform/src/components/data/DataSourceBadge.tsx";
import FernPage from "../../../../packages/platform/src/components/layout/UnimplementedPage.tsx";
import Chevron from "../../../../packages/platform/src/components/ui/Chevron.tsx";
import InfoIcon from "../../../../packages/platform/src/components/ui/InfoIcon.tsx";
import type { SourceStatus } from "../../../../packages/platform/src/domain/dataStatus.ts";
import { PROTOTYPE_SITES } from "../features/context/prototypeSites.ts";
import FernAppCard from "../features/dashboard/FernAppCard.tsx";
export default function FernHomepage({ onSignOut: performSignOut }: { onSignOut: () => void }) {
  const [route,setRoute]=useState(()=>readPortalRoute(window.location.search,{apps:appsEnabled}));
  const unavailable=(label:string)=>homeApplications.some(app=>app.name===label)&&!integratedApp(label);
  const activeNav=route.page;
  const homePanel=route.panel;
  const [lesson,setLesson]=useState<{title:string;request:number}|null>(()=>route.lesson?{title:route.lesson,request:0}:null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const applyRoute=(next:PortalRoute)=>{
    setRoute(next);
    setLesson(previous=>next.lesson?{title:next.lesson,request:(previous?.request??0)+1}:null);
    setSidebarOpen(false);
  };
  const navigate=(next:PortalRoute)=>{
    const url=window.location.pathname+portalLocation(window.location.search,next);
    if(url!==window.location.pathname+window.location.search+window.location.hash)window.history.pushState(null,'',url);
    applyRoute(next);
  };
  const setHomePanel=(panel:HomePanel)=>navigate({page:'Home',panel});
  const openLesson=(title:string)=>navigate({page:'Home',panel:'learn',lesson:title});
  useEffect(()=>{
    const restore=()=>applyRoute(readPortalRoute(window.location.search,{apps:appsEnabled}));
    window.addEventListener('popstate',restore);
    return()=>window.removeEventListener('popstate',restore);
  },[]);
  const [mobileNav,setMobileNav]=useState(()=>window.innerWidth<900);
  const workspaceMenu=useRef<HTMLElement>(null);
  const menuToggle=useRef<HTMLButtonElement>(null);
  const closeWorkspaceMenu=()=>{setSidebarOpen(false);requestAnimationFrame(()=>document.querySelector<HTMLButtonElement>('.fern-home-header>button')?.focus());};
  useEffect(()=>{const mq=window.matchMedia('(max-width: 899px)');const update=()=>setMobileNav(mq.matches);mq.addEventListener('change',update);return()=>mq.removeEventListener('change',update);},[]);
  useEffect(()=>{
    if(activeNav==='Home'||!sidebarOpen)return;
    const menu=workspaceMenu.current;
    const focusFrame=mobileNav?requestAnimationFrame(()=>menu?.querySelector<HTMLButtonElement>('.fern-workspace-close')?.focus()):null;
    const key=(e:KeyboardEvent)=>{
      if(e.key==='Escape'){e.preventDefault();closeWorkspaceMenu();return;}
      if(e.key!=='Tab'||!mobileNav)return;
      const items=Array.from(menu?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href]')??[]).filter(el=>el.getClientRects().length>0);
      const first=items[0],last=items[items.length-1];if(!first)return;
      if(e.shiftKey&&(document.activeElement===first||!menu?.contains(document.activeElement))){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&(document.activeElement===last||!menu?.contains(document.activeElement))){e.preventDefault();first.focus();}
    };
    document.addEventListener('keydown',key);return()=>{document.removeEventListener('keydown',key);if(focusFrame!==null)cancelAnimationFrame(focusFrame);};
  },[activeNav,sidebarOpen,mobileNav]);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [contextPanelOpen, setContextPanelOpen] = useState(false);
  const [activeContext, setActiveContextRaw] = useState(PROTOTYPE_SITES[0]);
  const [launchDirty,setLaunchDirty]=useState(false);
  const canLeaveLaunch=()=>!launchDirty||window.confirm('Your current assessment or plan has unsaved changes. Leave without saving?');
  const setActiveNav=(requested:string,pillar?:number)=>{
    if(!canLeaveLaunch())return;
    if(requested==='Service Models Explained'){openLesson(requested);return;}
    const panel=resourceDestinations.find(item=>item.label===requested)?.panel ?? legacyResourcePanels[requested] ?? null;
    const page=panel||requested==='Programme Overview / Dashboard'?'Home':requested;
    setLaunchDirty(false);
    navigate({page,panel,pillar:page==='Mission & Pillars'?pillar:undefined});
  };
  const setActiveContext:typeof setActiveContextRaw=(next)=>{const value=typeof next==='function'?next(activeContext):next;if(value.site!==activeContext.site&&!(launchDirty?canLeaveLaunch():activeNav==="Home"||activeNav==="FM Overview"||window.confirm("Change facility? Save any current tool inputs first. Unsaved inputs may be lost.")))return;if(value.site!==activeContext.site)setLaunchDirty(false);setActiveContextRaw(value);};
  const onSignOut=()=>{if(canLeaveLaunch())performSignOut();};
  const goHome=()=>{if(!canLeaveLaunch())return;setLaunchDirty(false);navigate({page:"Home",panel:null});setAvatarOpen(false);setNotificationsOpen(false);if(window.innerWidth<900)setSidebarOpen(false);requestAnimationFrame(()=>{document.getElementById("home")?.scrollIntoView({block:"start"});document.querySelector<HTMLElement>(".fern-hero h1")?.focus();});};
  // Keep group choices across homepage and Workspace navigation.
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "Workspace": true,
    "FERN Apps": false,
    "Resources & Help": false,
  });

  useEffect(()=>{
    const group=homePanel?"Resources & Help":navGroups.find(group=>group.items.some(item=>item.label===activeNav))?.label;
    if(group)setExpandedGroups(previous=>({...previous,[group]:true}));
  },[activeNav,homePanel]);

  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleGroup(label: string) {
    setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  // Find which group the active nav item belongs to
  const activeGroup =
    navGroups.find((g) => g.items.some((i) => i.label === activeNav))?.label ?? "";

  const isDashboard = activeNav === "Home";
  const pageContent = useRef<HTMLElement>(null);
  useEffect(() => {
    if (activeNav === "Home") return;
    const frame = requestAnimationFrame(() => {
      const main = pageContent.current;
      if (!main) return;
      main.scrollTo({top:0,behavior:'instant'});
      if(activeNav==='Mission & Pillars'&&route.pillar){
        const card=main.querySelector<HTMLDetailsElement>(`#fw-pillar-${route.pillar}`);
        if(card){card.open=true;card.scrollIntoView({block:'start',behavior:'instant'});card.querySelector<HTMLElement>('summary')?.focus({preventScroll:true});return;}
      }
      const heading = main.querySelector<HTMLElement>("h1, h2");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [activeNav,route.pillar]);


  return (
    <div
      className="fern-portal flex h-full flex-col"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <HomeHeader currentPage={activeNav} currentPanel={isDashboard?homePanel:null} open={sidebarOpen} toggle={()=>setSidebarOpen(v=>!v)} onPanel={setHomePanel} onHome={goHome}/>
      <div className="fern-portal-body flex flex-1 min-h-0">
      {!isDashboard && sidebarOpen && <button className="fern-workspace-backdrop" aria-label="Close navigation" onClick={closeWorkspaceMenu}/> }
      {/* ── Sidebar ── */}
      {isDashboard ? <HomeSidebar expandedGroups={expandedGroups} onToggleGroup={toggleGroup} currentPanel={homePanel} mobile={mobileNav} onHome={goHome} open={sidebarOpen} close={()=>setSidebarOpen(false)} onNavigate={setActiveNav} onPanel={setHomePanel} onSignOut={onSignOut}/> : <aside
        ref={workspaceMenu}
        id="fern-workspace-sidebar"
        role={mobileNav?"dialog":undefined}
        aria-modal={mobileNav&&sidebarOpen?true:undefined}
        aria-label="Workspace navigation"
        inert={!sidebarOpen}
        className="fern-workspace-sidebar flex flex-col shrink-0 overflow-hidden transition-all duration-300"
        style={{
          width: sidebarOpen ? 264 : 0,
          background: "#ffffff",
          borderRight: "1px solid #e5e7eb",
        }}
      >
        {mobileNav && <button className="fern-workspace-close" onClick={closeWorkspaceMenu}>Close menu ×</button>}
        {/* Brand */}
        <div
          className="flex flex-col px-5 pt-4 pb-3 shrink-0"
          style={{
            background: "#0d2464",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex items-center gap-2">
            <button onClick={goHome} aria-label="FERN — return Home"
              className="text-2xl font-extrabold tracking-tight text-white"
              style={{ letterSpacing: "-0.03em" }}
            >
              FERN
            </button>
            <img
              src={fernAiMascot}
              alt="FERN AI mascot"
              style={{
                width: 52,
                height: 52,
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
            <span
              className="text-xs font-medium ml-auto self-start pt-0.5"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              v2.4
            </span>
          </div>
          <p
            className="text-xs font-medium leading-snug mt-0.5"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Facility Expert Reference Network
          </p>
        </div>

        {/* Scrollable nav — independent from the sidebar footer */}
        <nav className="flex-1 overflow-y-auto py-2" style={{ scrollbarWidth: "none" }}>
          <button onClick={goHome} className="w-full text-left px-5 py-3 text-sm font-semibold text-blue-900">Home</button>
          {navGroups.map((group) => {
            const isOpen = expandedGroups[group.label] ?? false;
            return (
              <div key={group.label}>
                {/* Group header — expand/collapse button separate from info icon */}
                <div className="flex items-center transition-colors hover:bg-gray-50">
                  <button
                    onClick={() => toggleGroup(group.label)}
                    aria-expanded={isOpen}
                    aria-controls={"fern-workspace-group-"+group.label.replace(/[^a-z0-9]/gi,"-")}
                    className="flex-1 flex items-center gap-2 px-4 py-2"
                  >
                    <span style={{ color: "#9ca3af" }}>{group.icon}</span>
                    <span className="flex-1 text-left min-w-0">
                      <span
                        className="block text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "#6b7280", letterSpacing: "0.09em" }}
                      >
                        {group.label}
                      </span>
                      {group.subtitle && (
                        <span className="text-xs" style={{ color: "#9ca3af", fontSize: 10 }}>
                          {group.subtitle}
                        </span>
                      )}
                    </span>
                    <span style={{ color: "#9ca3af" }}>
                      <Chevron open={isOpen} />
                    </span>
                  </button>
                  <div className="pr-3 flex items-center gap-1">
                    {(group as { subtitleTip?: string }).subtitleTip && (
                      <InfoIcon
                        label={(group as { subtitle?: string }).subtitle ?? group.label}
                        text={(group as { subtitleTip?: string }).subtitleTip!}
                        side="right"
                      />
                    )}
                    {group.tooltip && (
                      <InfoIcon label={group.label} text={group.tooltip} side="right" />
                    )}
                  </div>
                </div>

                {/* Child items */}
                <div id={"fern-workspace-group-"+group.label.replace(/[^a-z0-9]/gi,"-")} hidden={!isOpen}>
                  {group.items.map((item) => {
                    const active = activeNav === item.label;
                    if (item.tooltip) {
                      return (
                        <div
                          key={item.label}
                          className="flex items-center transition-all"
                          style={{
                            background: active ? "#eff6ff" : "transparent",
                            borderLeft: active ? "3px solid #1a3fb5" : "3px solid transparent",
                          }}
                        >
                          <button
                            disabled={unavailable(item.label)} title={unavailable(item.label) ? "Coming soon to the FERN website" : undefined} onClick={() => setActiveNav(item.label)}
                            className="flex-1 text-left flex items-center gap-1 py-2 text-xs hover:bg-gray-50"
                            style={{
                              paddingLeft: 25,
                              color: active ? "#1a3fb5" : "#4b5563",
                              fontWeight: active ? 600 : 400,
                            }}
                          >
                            <span className="leading-snug flex-1 pr-1">{item.label}</span>
                            {(item.tag || unavailable(item.label)) && (
                              <span
                                className="shrink-0 px-1.5 py-0.5 rounded mr-1"
                                style={{
                                  background: "#eff6ff",
                                  color: "#1a56db",
                                  fontSize: 10,
                                  fontWeight: 600,
                                }}
                              >
                                {unavailable(item.label) ? "Coming soon" : item.tag}
                              </span>
                            )}
                          </button>
                          <div className="pr-3">
                            <InfoIcon label={item.label} text={item.tooltip} side="right" />
                          </div>
                        </div>
                      );
                    }
                    return (
                      <button
                        key={item.label}
                        disabled={unavailable(item.label)} title={unavailable(item.label) ? "Coming soon to the FERN website" : undefined} onClick={() => setActiveNav(item.label)}
                        className="w-full text-left flex items-center justify-between py-2 text-sm transition-all hover:bg-gray-50"
                        style={{
                          paddingLeft: 28,
                          paddingRight: 12,
                          background: active ? "#eff6ff" : "transparent",
                          color: active ? "#1a3fb5" : "#4b5563",
                          borderLeft: active ? "3px solid #1a3fb5" : "3px solid transparent",
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        <span className="leading-snug pr-2 text-xs">{item.label}</span>
                        {(item.tag || unavailable(item.label)) && (
                          <span
                            className="shrink-0 px-1.5 py-0.5 rounded"
                            style={{
                              background: "#eff6ff",
                              color: "#1a56db",
                              fontSize: 10,
                              fontWeight: 600,
                            }}
                          >
                            {unavailable(item.label) ? "Coming soon" : item.tag}
                          </span>
                        )}
                      </button>
                    );
                  })}</div>
              </div>
            );
          })}
        </nav>

        {/* Sidebar footer — fixed at bottom */}
        <div className="px-4 py-4 border-t shrink-0" style={{ borderColor: "#e5e7eb" }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: "#1a56db" }}
            >
              RK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: "#0d2464" }}>
                Prototype User
              </p>
              <p className="text-xs truncate" style={{ color: "#6b7280" }}>
                Prototype — Demonstration Only
              </p>
            </div>
            <button
              onClick={onSignOut}
              title="Sign out"
              className="hover:opacity-70 transition-opacity shrink-0"
              style={{ color: "#9ca3af" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M10 11l3-3-3-3M13 8H6"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>}

      {/* ── Main content ── */}
      <div inert={mobileNav && sidebarOpen} className="flex-1 flex flex-col min-w-0 bg-gray-50">
        {/* Page content */}
        <main ref={pageContent} className={isDashboard ? "flex-1 overflow-y-auto bg-white" : "flex-1 overflow-y-auto px-2 py-3 sm:px-6 sm:py-6"}>

          {!isDashboard && <nav className="fern-page-breadcrumb" aria-label="Breadcrumb"><button onClick={goHome}>Home</button><span>/</span>{integratedApp(activeNav)?<span>FERN Apps</span>:<button onClick={()=>setActiveNav("Workspace")}>Workspace</button>}<span>/</span><span aria-current="page">{activeNav}</span></nav>}
          <SearchNavigation.Provider value={setActiveNav}><React.Suspense key={activeContext.site} fallback={<p role="status">Loading application…</p>}>
            {isDashboard ? (
              <DashboardPage
                activeContext={activeContext}
                setActiveContext={setActiveContext}
                setActiveNav={setActiveNav}
                lesson={lesson}
                onLesson={openLesson}
                panel={homePanel}
                setPanel={setHomePanel}
              />
            ) : activeNav === "Mission & Pillars" ? (
              <MissionPillars onNavigate={setActiveNav}/>
            ) : activeNav === "Workspace" ? (
              <WorkspaceIndex onNavigate={setActiveNav}/>
            ) : activeNav === "FM Overview" ? (
              <IntegratedWorkspace key={activeNav} title={activeNav} onNavigate={setActiveNav}><FmOverviewPage context={activeContext} onSelect={setActiveContext} onNavigate={setActiveNav}/></IntegratedWorkspace>
            ) : activeNav === "Leadership & Policy" ? (
              <IntegratedWorkspace key={activeNav} title={activeNav} onNavigate={setActiveNav}><LeadershipPolicyPage onNavigate={setActiveNav}/></IntegratedWorkspace>
            ) : activeNav === "Planning & Objectives" ? (
              <IntegratedWorkspace key={activeNav} title={activeNav} onNavigate={setActiveNav}><PlanningObjectivesPage onNavigate={setActiveNav}/></IntegratedWorkspace>
            ) : activeNav === "Performance & KPIs" ? (
              <IntegratedWorkspace key={activeNav} title={activeNav} onNavigate={setActiveNav}><PerformanceKpiPage/></IntegratedWorkspace>
            ) : activeNav === "Risk & Compliance" ? (
              <IntegratedWorkspace key={activeNav} title={activeNav} onNavigate={setActiveNav}><RiskCompliancePage onNavigate={setActiveNav}/></IntegratedWorkspace>
            ) : activeNav === "Audit & Assurance" ? (
              <IntegratedWorkspace key={activeNav} title={activeNav} onNavigate={setActiveNav}><AuditAssurancePage onNavigate={setActiveNav}/></IntegratedWorkspace>
            ) : activeNav === "Continual Improvement" ? (
              <IntegratedWorkspace key={activeNav} title={activeNav} onNavigate={setActiveNav}><ContinualImprovementPage/></IntegratedWorkspace>
            ) : integratedApp(activeNav) ? (
              <IntegratedAppView app={integratedApp(activeNav)!} context={activeContext} onNavigate={setActiveNav} onDirtyChange={setLaunchDirty}/>
            ) : homeApplications.some(app=>app.name===activeNav) ? (
              <section className="rounded-xl border bg-white p-6"><h1 className="text-2xl font-bold">{activeNav}</h1><p className="my-4">{homeApplications.find(app=>app.name===activeNav)?.description}</p><p>Coming soon to the FERN website. This application is not available here.</p><button className="fern-primary mt-4" onClick={goHome}>Return to Home</button></section>
            ) : (
              <FernPage title={activeNav} group={activeGroup} onHome={goHome} onHelp={()=>setActiveNav("Help & Guidance")} />
            )}
          </React.Suspense></SearchNavigation.Provider>
          <SiteFooter onNavigate={setActiveNav} onHome={goHome} onSignOut={onSignOut}/>
          
        </main>
      </div>
      </div>
    </div>
  );
}
