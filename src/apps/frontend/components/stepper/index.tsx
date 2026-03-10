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
    <div className="flex w-full flex-col items-center gap-7 px-3 py-4 sm:px-6">
      <div className="mx-auto flex h-14 w-full max-w-4xl items-center px-2 sm:px-6">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <button
              type="button"
              className={`relative flex shrink-0 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 ${
                activeStepIndex > index
                  ? "h-8 w-8 border-primary bg-primary text-white"
                  : activeStepIndex === index
                    ? "h-8 w-8 border-primary bg-white shadow-[0_0_0_3px_rgba(36,99,235,0.14)]"
                    : "h-7 w-7 border-grey50 bg-white"
              }`}
              onClick={() => handleNavigation(step.id)}
              aria-current={activeStepIndex === index ? "step" : undefined}
            >
              {activeStepIndex > index ? (
                <Check size={16} />
              ) : (
                <span
                  className={`rounded-full ${
                    activeStepIndex === index
                      ? "h-3 w-3 bg-primary"
                      : "h-2 w-2 bg-grey50"
                  }`}
                />
              )}

              <div className="absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 whitespace-nowrap">
                <Text
                  font="LabelSmall"
                  color={
                    activeStepIndex >= index ? "text-primary" : "text-grey50"
                  }
                  textAlign="center"
                >
                  {step.label}
                </Text>
              </div>
            </button>

            {index !== steps.length - 1 && (
              <div
                className={`mx-2 mt-[1px] h-[2px] flex-1 rounded-full ${
                  activeStepIndex > index ? "bg-primary" : "bg-grey50"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="w-full pt-3">{children}</div>
    </div>
  );
};

export default Stepper;
