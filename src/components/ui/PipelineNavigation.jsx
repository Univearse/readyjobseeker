import { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import {
  DocumentCheckIcon,
  CheckCircleIcon,
  CalendarIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const stages = [
  {
    id: 'all',
    name: 'All Candidates',
    icon: UserGroupIcon,
    description: 'View all shortlisted candidates',
  },
  {
    id: 'assessment_pending',
    name: 'Assessment Pending',
    icon: DocumentCheckIcon,
    description: 'Candidates who need to complete assessment',
  },
  {
    id: 'assessment_completed',
    name: 'Assessment Completed',
    icon: CheckCircleIcon,
    description: 'Candidates who completed assessment',
  },
  {
    id: 'interview_scheduled',
    name: 'Interview Stage',
    icon: CalendarIcon,
    description: 'Candidates with scheduled interviews',
  },
  {
    id: 'offer_stage',
    name: 'Final Selection',
    icon: StarIcon,
    description: 'Candidates in offer stage',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PipelineNavigation({ selectedStage, onStageChange, stageCounts }) {
  return (
    <div className="w-full px-8 mb-8">
      <Tab.Group onChange={onStageChange} defaultIndex={stages.findIndex(stage => stage.id === selectedStage)}>
        <Tab.List className="flex space-x-4 bg-white rounded-2xl shadow-lg p-2">
          {stages.map((stage) => (
            <Tab
              key={stage.id}
              className={({ selected }) =>
                classNames(
                  'flex-1 flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200',
                  'focus:outline-none',
                  selected
                    ? 'bg-brand-aqua/10 text-brand-aqua'
                    : 'text-neutral-600 hover:bg-neutral-50'
                )
              }
            >
              {({ selected }) => (
                <>
                  <div className={classNames(
                    'p-2 rounded-lg',
                    selected ? 'bg-brand-aqua/20' : 'bg-neutral-100'
                  )}>
                    <stage.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{stage.name}</div>
                    <div className="text-xs opacity-75">{stageCounts?.[stage.id] || 0} candidates</div>
                  </div>
                </>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-4">
          {stages.map((stage) => (
            <Tab.Panel
              key={stage.id}
              className="bg-white rounded-2xl shadow-lg p-6 focus:outline-none"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-aqua/10 rounded-xl">
                  <stage.icon className="w-6 h-6 text-brand-aqua" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-brand-black">
                    {stage.name}
                  </h3>
                  <p className="text-neutral-600">
                    {stage.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-brand-aqua">
                    <span className="font-medium">{stageCounts?.[stage.id] || 0}</span>
                    <span className="text-neutral-600">candidates in this stage</span>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
} 