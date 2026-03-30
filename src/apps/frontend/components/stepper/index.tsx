import React, { type PropsWithChildren, useEffect, useState } from "react";
import Text from "../typography/text";
import type { SetupUiStepsType, StepType } from "../../types";
import { Check } from "lucide-react";

interface StepperProps {
  steps: StepType[];
  showButtons?: boolean;
  currentStep?: StepType;
  handleChangeStep?: (value: SetupUiStepsType) => void;
}

const Stepper: React.FC<PropsWithChildren<StepperProps>> = ({
  steps,
  children,
  currentStep,
  handleChangeStep,
}) => {
  const firstStepId = steps[0]?.id ?? -1;
  const [activeStepId, setActiveStepId] = useState<number>(
    currentStep?.id ?? firstStepId,
  );

  useEffect(() => {
    if (currentStep) {
      setActiveStepId(currentStep.id);
    }
  }, [currentStep]);

  useEffect(() => {
    if (!steps.some((step) => step.id === activeStepId) && firstStepId !== -1) {
      setActiveStepId(firstStepId);
    }
  }, [activeStepId, firstStepId, steps]);

  const handleNavigation = (id: number) => {
    const nextStep = steps.find((step) => step.id === id);
    if (!nextStep || nextStep.id === activeStepId) return;

    setActiveStepId(nextStep.id);
    handleChangeStep?.(nextStep.value);
  };

  const activeStepIndex = steps.findIndex((step) => step.id === activeStepId);

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            className={`group relative hover:cursor-pointer flex min-h-28 w-full items-start gap-4 rounded-[1.5rem] border p-4 text-left transition-all duration-200 ${
              activeStepIndex > index
                ? "border-primary bg-primary text-white shadow-[0_18px_40px_-24px_rgba(37,99,235,0.75)]"
                : activeStepIndex === index
                ? "border-primary bg-white shadow-[0_0_0_3px_rgba(37,99,235,0.14)]"
                : "border-primary-100 bg-white text-black hover:border-primary-200 hover:bg-primary-50/50"
            }`}
            onClick={() => handleNavigation(step.id)}
            aria-current={activeStepIndex === index ? "step" : undefined}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold transition-all ${
                activeStepIndex > index
                  ? "border-white/20 bg-white/15 text-white"
                  : activeStepIndex === index
                  ? "border-primary bg-primary text-white"
                  : "border-primary-100 bg-primary-50 text-primary-700"
              }`}
            >
              {activeStepIndex > index ? <Check size={18} /> : index + 1}
            </div>

            <div className="min-w-0 space-y-2">
              <p
                className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${
                  activeStepIndex > index
                    ? "text-primary-100"
                    : activeStepIndex === index
                    ? "text-primary-600"
                    : "text-primary-500"
                }`}
              >
                Step {index + 1}
              </p>
              <Text
                font="LabelMedium"
                color={
                  activeStepIndex > index
                    ? "text-white"
                    : activeStepIndex === index
                    ? "text-primary"
                    : undefined
                }
              >
                {step.label}
              </Text>
            </div>

            {activeStepIndex === index && (
              <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Stepper;
