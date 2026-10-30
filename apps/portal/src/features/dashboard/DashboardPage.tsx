import FernAISearch from '../search/FernAISearch';
import {HomeMission} from '../framework/MissionPillars';
import '../visual/coordinated-design.css';
import '../visual/human-review.css';
import {HomeRoutes} from '../visual/VisualGuide';
import ReferenceLibrary from './ReferenceLibrary.tsx';
import AboutFern from './AboutFern.tsx';
import HelpGuidance from './HelpGuidance.tsx';
import Learn from './Learn.tsx';
import GetStarted from './GetStarted.tsx';
import FernUpdates from './FernUpdates.tsx';
import HomeApplications from './HomeApplications.tsx';
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowsLeftRight,
  BookOpen,
  Buildings,
  ClipboardText,
  FileText,
  UsersThree,
} from "@phosphor-icons/react";
import hero from "../../../../../packages/platform/src/assets/home-hero-black-colleague-blended.png";
import helper from "../../../../../packages/platform/src/assets/fern-guide-transparent.png";
import type { HomePanel } from "./HomeNavigation.tsx";
import modelArt from "../../../../../packages/platform/src/assets/teaser-art-model-transparent.png";
import transitionArt from "../../../../../packages/platform/src/assets/teaser-art-transition-transparent.png";
import facilityArt from "../../../../../packages/platform/src/assets/teaser-art-facility-transparent.png";
import guidesArt from "../../../../../packages/platform/src/assets/teaser-art-guides-transparent.png";
import learningArt from "../../../../../packages/platform/src/assets/teaser-art-learning-transparent.png";
import "./home.css";
export default function DashboardPage({
  setActiveNav,
  panel,
  setPanel,
  lesson,
  onLesson: openLesson,
}: {
  setActiveNav: (page: string, pillar?:number) => void;
  lesson: {title:string;request:number}|null;
  onLesson: (title:string)=>void;
  panel: HomePanel;
  setPanel: (p: HomePanel) => void;
}) {
  const panelRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (panel) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      panelRef.current?.focus({ preventScroll: true });
    }
  }, [panel]);
  const titles = {
    updates: "What’s New & Coming to FERN",
    about: "What is FERN?",
    facility: "Facility Information",
    guide: "Getting started with FERN",
    learn: "Learn at your own pace",
    reference: "Reference library",
    help: "Help & Guidance",
  };
  if(panel){
    const backHome=()=>{setPanel(null);requestAnimationFrame(()=>{const heading=document.querySelector<HTMLElement>('.fern-hero h1');heading?.focus({preventScroll:true});heading?.scrollIntoView({block:'start'});});};
    return <div className="fern-home fern-resource-view"><section className="fern-expanded-panel" ref={panelRef} tabIndex={-1} aria-label={titles[panel]}><div className="fern-resource-heading"><button className="fern-outline" onClick={backHome}>← Back to Home</button><h1>{titles[panel]}</h1></div>{panel!=="reference"&&<FernAISearch key={panel} page={titles[panel]}/>}{panel==='guide'?<GetStarted onPanel={setPanel} onNavigate={setActiveNav}/>:panel==='updates'?<FernUpdates/>:panel==='facility'?<p>Facility selection and site history will be available with the applications. You can explore this website without selecting a facility.</p>:<HomeGuidance onLesson={openLesson} lesson={lesson} panel={panel} onPanel={setPanel} onNavigate={setActiveNav}/>}</section></div>;
  }
  return (
    <div className="fern-home" id="home">
      <section className="fern-hero">
        <div>
          <h1 tabIndex={-1}>
            Welcome to
            <br />
            FERN.
          </h1>
          <h2>
            Your friendly guide to
            <br />
            better facilities.
          </h2>
          <p>
            Find the tools, guidance and
            <br />
            knowledge to plan your next step.
          </p>
          <div className="fern-hero-actions">
            <button className="fern-primary" onClick={() => setPanel("guide")}>
              Get started <ArrowRight size={18} />
            </button>
            <button className="fern-outline" onClick={() => setPanel("about")}>
              What is FERN?
            </button>
          </div>
        </div>
        <img src={hero} alt="Facilities colleagues reviewing a tablet in a warehouse" />
      </section>
      <div className="fern-home-body"><FernAISearch page="Home"/><HomeMission onNavigate={setActiveNav}/><div className="fern-start-heading"><h2>What would you like to do today?</h2><p>Choose a starting point. You can explore the guidance without selecting a facility.</p></div><HomeRoutes onReference={()=>setPanel("reference")} onLearn={()=>setPanel("learn")} onWorkspace={()=>setActiveNav("Workspace")}/>
        <div className="fern-learning-grid">
          <section className="fern-home-panel">
            <h2>New to FERN? Start here</h2>
            <p>Essential steps to get you up and running quickly.</p>
            {[
              {
                Icon: Buildings,
                art: facilityArt,
                title: "Discover FERN",
                text: "Explore the website, its guidance and the tools being developed.",
                run: () => setPanel("about"),
              },
              {
                Icon: ArrowsLeftRight,
                art: facilityArt,
                title: "Compare service options",
                text: "Explore service models and delivery options that fit your needs.",
                run: () => setPanel("guide"),
              },
              {
                Icon: FileText,
                art: guidesArt,
                title: "Guides and templates",
                text: "Access practical guidance to support your work.",
                run: () => setPanel("reference"),
              },
            ].map(({ art, title, text, run }) => (
              <button className="fern-start-row" key={title} onClick={run}>
                <span>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
                <img className="fern-start-art" src={art} alt="" />
                <ArrowRight size={17} />
              </button>
            ))}
            <button className="fern-text-link" onClick={() => setPanel("guide")}>
              View all getting started resources <ArrowRight size={16} />
            </button>
          </section>
          <section className="fern-home-panel">
            <h2>Learn at your own pace</h2>
            <p>Build your skills with guidance for your next step.</p>
            <strong className="fern-preview-label">Learning topics</strong>
            {[
              {
                Icon: BookOpen,
                art: learningArt,
                title: "Understanding FERN",
                text: "An overview of FERN and how its tools support facility management.",
              },
              {
                Icon: UsersThree,
                art: modelArt,
                title: "Service models explained",
                text: "Learn about service models and where to start a comparison.",
              },
              {
                Icon: ClipboardText,
                art: transitionArt,
                title: "From tender to transition",
                text: "Follow the steps from assessment to mobilisation.",
              },
            ].map(({ art, title, text }) => (
              <button className="fern-learn-row" key={title} onClick={() => openLesson(title)}>
                <img className="fern-learn-art" src={art} alt="" />
                <span>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
                <ArrowRight size={16} />
              </button>
            ))}
            <button className="fern-text-link" onClick={() => {setPanel("learn");panelRef.current?.scrollIntoView({block:"start"});}}>
              Explore learning topics <ArrowRight size={16} />
            </button>
          </section>
        </div>

        <HomeApplications onOpen={setActiveNav}/>

        <section className="fern-help fern-assistant-help" aria-labelledby="fern-help-title">
          <img src={helper} alt="" />
          <div className="fern-assistant-help-content">
            <h2 id="fern-help-title">Need a hand?</h2>
            <p>Find guidance and understand your next step.</p>
            <button className="fern-text-link" onClick={() => setPanel("help")}>Browse Help &amp; Guidance <ArrowRight size={16}/></button>
          </div>
        </section>
      </div>
    </div>
  );
}
function HomeGuidance({
  onLesson,
  lesson,
  panel,
  onPanel,
  onNavigate,
}: {
  onLesson: (title:string)=>void;
  lesson: {title:string;request:number} | null;
  panel: Exclude<HomePanel, "facility" | "updates" | "guide" | null>;
  onPanel: (p: HomePanel) => void;
  onNavigate: (s: string) => void;
}) {
  return (
    <div className="fern-guidance-copy">
      {panel === "about" ? (
        <AboutFern onPanel={onPanel}/>
      ) : panel === "learn" ? (
        <Learn onLesson={onLesson} requestedLesson={lesson} onPanel={onPanel} onNavigate={onNavigate}/>
      ) : panel === "reference" ? (
        <ReferenceLibrary/>
      ) : (
        <HelpGuidance onPanel={onPanel} onNavigate={onNavigate}/>
      )}

    </div>
  );
}
