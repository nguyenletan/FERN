const lessons: Record<string, {heading:string; text?:string; steps?:[string,string][]; example?:string}[]> = {
 'Understanding FERN': [
  {heading:'Four Questions to Ask', steps:[
   ['What Do We Know?','Identify the asset, facility, service or decision and the information available.'],
   ['Can We Rely on It?','Check who supplied the information, its date and scope, and whether anything is missing or conflicting.'],
   ['What Does It Mean?','Consider the information alongside the relevant requirements and operating conditions.'],
   ['What Happens Next?','Identify the evidence, review or decision needed. Do not treat an output as permission to act.']
  ]},
  {heading:'An Asset’s Age Is Only One Input',example:'Illustrative example: an air-handling unit is recorded as 17 years old. Age alone does not decide whether it should be replaced. Condition, failure history, maintenance cost, remaining life, redundancy, parts availability and operational consequences may change the decision.'},
  {heading:'A Useful Result Can Include a Gap',text:'Incomplete information does not make every part of an assessment useless. Retain what is known, state the assumption or gap and identify which conclusion needs more evidence. Never turn an unknown quantity or cost into zero just to produce a total.'},
  {heading:'Try It',text:'Choose a decision you are considering. Write down what you know, the source of each input, what is uncertain and who needs to review the outcome. Use Get Started to find the relevant tool.'}
 ],
 'Service Models Explained': [
  {heading:'Separate Delivery From Service Level',steps:[
   ['Delivery Model','Describes who organises and delivers the service and how responsibilities are allocated.'],
   ['Service Tier','Describes the level of service being considered. The tier does not decide who employs the people delivering it.']
  ]},
  {heading:'Read the Arrangement, Not Just Its Name',text:'Blue Badge refers to Amazon internal resources. IFM uses external FM provision; IFM Hybrid combines internal and external resources. Fully Contained is described in the current guidance as an output-based arrangement. Actual scope, responsibilities and contractual obligations must be checked against the applicable source. AFM is not classified here as a confirmed selectable alternative.'},
  {heading:'Prime, Plus and Core',text:'Prime is the highest service tier, Plus is intermediate and Core is the basic tier. All must respect the applicable mandatory requirement floor. A lower tier does not remove life-safety, compliance, OEM, warranty or other applicable requirements. Run-to-failure requires justification and must be permitted for the asset and activity.'},
  {heading:'One Facility Can Need Different Treatments',example:'Illustrative example: two facilities use the same external delivery model, but one operates continuously with limited backup equipment. Their appropriate service levels may differ. Within either facility, critical plant may need a different maintenance approach from less critical equipment.'},
  {heading:'Before Comparing Options',text:'Record the service scope, operating hours, asset population, responsibilities, capability and mandatory requirements. Compare the model and tier together, explain differences and retain any asset-level exceptions. A cheaper package is not automatically equivalent service.'}
 ],
 'From Tender to Transition': [
  {heading:'Follow the Decision Through Its Stages',steps:[
   ['Understand','Identify the facility needs, current arrangement, available history and gaps.'],
   ['Define','Establish service scope, responsibilities, requirements and expected outcomes.'],
   ['Compare','Review delivery and service options with their operational consequences.'],
   ['Price','Prepare a consistent cost basis and explain scope, service-level and timing differences.'],
   ['Source and Contract','Use the authorised procurement and contractual process. A FERN comparison does not award a contract.'],
   ['Mobilise','Plan tasks, responsibilities, evidence and handover for the selected arrangement.'],
   ['Operate and Review','Use operational records, performance and assurance evidence to identify issues and improvements.']
  ]},
  {heading:'Keep the Handover Traceable',text:'Carry forward the selected scope, pricing version, assumptions, unresolved issues and the actual decision. Newer pricing must not silently replace the version used for an earlier assessment. If inputs change, review the comparison again.'},
  {heading:'What the Current Tools Support',text:'Pre-Contract supports local assessments and service alternatives. Pricing supplies fixed provisional pricing issues that can be selected in Pre-Contract and Lifecycle. Mobilisation supports a local manual plan. Moving between these tools does not automatically transfer an approved decision or establish readiness.'},
  {heading:'Before Starting Mobilisation',text:'Check that the selected arrangement, responsibilities, acceptance criteria and outstanding issues are understood by the responsible people. Completing a task is different from verifying its evidence or approving a launch.'}
 ]
};
export default function IntroductoryLearning({topic}:{topic:string}) {
 return <>{(lessons[topic]??[]).map(lesson=><section key={lesson.heading}>
  <h3>{lesson.heading}</h3>
  {lesson.text&&<p>{lesson.text}</p>}
  {lesson.example&&<p className="fern-learning-example">{lesson.example}</p>}
  {lesson.steps&&<ol className="fern-learning-steps">{lesson.steps.map(([title,detail])=><li key={title}><strong>{title}.</strong> {detail}</li>)}</ol>}
 </section>)}</>;
}
