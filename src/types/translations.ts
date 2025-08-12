import { Language } from './index';

// Translation keys structure
export interface TranslationKeys {
  common: CommonTranslations;
  pages: {
    home: HomeTranslations;
    wishes: WishesTranslations;
    agents: AgentsTranslations;
    launchMission: LaunchMissionTranslations;
    trainAgent: TrainAgentTranslations;
    roles: RolesTranslations;
    narratives: NarrativesTranslations;
    taskSquare: TaskSquareTranslations;
  };
  components: {
    wishCard: WishCardTranslations;
    translationControls: TranslationControlsTranslations;
    errorBoundary: ErrorBoundaryTranslations;
    apiStatus: ApiStatusTranslations;
  };
  forms: {
    common: FormCommonTranslations;
    validation: ValidationTranslations;
  };
  errors: {
    common: ErrorCommonTranslations;
    network: NetworkErrorTranslations;
  };
}

// Common translations
export interface CommonTranslations {
  loading: string;
  error: string;
  success: string;
  cancel: string;
  confirm: string;
  save: string;
  delete: string;
  edit: string;
  view: string;
  back: string;
  next: string;
  previous: string;
  submit: string;
  reset: string;
  search: string;
  filter: string;
  sort: string;
  refresh: string;
  close: string;
  open: string;
  yes: string;
  no: string;
  ok: string;
  retry: string;
  copy: string;
  share: string;
  download: string;
  upload: string;
  settings: string;
  profile: string;
  logout: string;
  login: string;
  register: string;
}

// Page translations
export interface HomeTranslations {
  title: string;
  subtitle: string;
  description: string;
  getStarted: string;
  learnMore: string;
  features: {
    title: string;
    aiTraining: string;
    collaboration: string;
    community: string;
  };
}

export interface WishesTranslations {
  title: string;
  subtitle: string;
  currentDisplay: string;
  wishes: string;
  loading: string;
  loadingFailed: string;
  retry: string;
  copyright: string;
  currentLanguage: string;
  currentLanguageEn: string;
  defaultWishes: {
    title: string;
    description: string;
    author: string;
    tags: string;
  };
  add: {
    title: string;
    subtitle: string;
    form: {
      title: string;
      titlePlaceholder: string;
      description: string;
      descriptionPlaceholder: string;
      tags: string;
      tagsPlaceholder: string;
      submit: string;
      back: string;
    };
  };
}

export interface AgentsTranslations {
  title: string;
  subtitle: string;
  creator: string;
  creatorBy: string;
  trainingProgress: string;
  viewDetails: string;
  use: string;
  noAgentsYet: string;
  noAgentsDesc: string;
  startTraining: string;
  avgProgress: string;
}

export interface LaunchMissionTranslations {
  title: string;
  subtitle: string;
  form: {
    title: string;
    titlePlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    tags: string;
    tagsPlaceholder: string;
    submit: string;
    submitting: string;
    back: string;
  };
}

export interface TrainAgentTranslations {
  title: string;
  subtitle: string;
  // Add specific translations as needed
}

export interface RolesTranslations {
  title: string;
  subtitle: string;
  // Add specific translations as needed
}

export interface NarrativesTranslations {
  title: string;
  subtitle: string;
  backHome: string;
  total: string;
  agentBiographies: string;
  communityHistory: string;
  totalLikes: string;
  readMore: string;
  other: string;
  shareStory: string;
  shareButton: string;
  shareDesc1: string;
  shareDesc2: string;
  timelineTitle: string;
  types: {
    community: string;
    agentBiography: string;
    other: string;
  };
}

export interface TaskSquareTranslations {
  title: string;
  subtitle: string;
  backHome: string;
  total: string;
  open: string;
  inProgress: string;
  completed: string;
  closed: string;
  pending: string;
  high: string;
  medium: string;
  low: string;
  reward: string;
  participants: string;
  assignee: string;
  experience: string;
}

// Component translations
export interface WishCardTranslations {
  like: string;
  comment: string;
  share: string;
  edit: string;
  delete: string;
  status: {
    pending: string;
    inProgress: string;
    completed: string;
    cancelled: string;
  };
  priority: {
    low: string;
    medium: string;
    high: string;
    urgent: string;
  };
}

export interface TranslationControlsTranslations {
  language: string;
  autoTranslate: string;
  settings: string;
}

export interface ErrorBoundaryTranslations {
  title: string;
  message: string;
  retry: string;
  report: string;
}

export interface ApiStatusTranslations {
  online: string;
  offline: string;
  connecting: string;
  error: string;
}

// Form translations
export interface FormCommonTranslations {
  required: string;
  optional: string;
  minLength: string;
  maxLength: string;
  invalidFormat: string;
}

export interface ValidationTranslations {
  required: string;
  minLength: string;
  maxLength: string;
  invalidEmail: string;
  invalidUrl: string;
  invalidNumber: string;
  invalidDate: string;
}

// Error translations
export interface ErrorCommonTranslations {
  unexpected: string;
  notFound: string;
  unauthorized: string;
  forbidden: string;
  serverError: string;
}

export interface NetworkErrorTranslations {
  connectionFailed: string;
  timeout: string;
  serverUnavailable: string;
}

// Translation function type
export type TranslationFunction = (
  key: string,
  params?: Record<string, any>
) => string;

// Translation context type
export interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationFunction;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  autoTranslate: boolean;
  setAutoTranslate: (auto: boolean) => void;
}
