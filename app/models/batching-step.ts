export interface BatchingStep {
    jobKey: string;
    stepName: string;
    stepComponent: string;
    previousButtonText: string;
    nextButtonText: string;
    isLastStep: boolean;
    stepOrder: number;
    isComplete: boolean;
}