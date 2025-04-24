interface Step {
  id: number;
}

interface StepsThroughProps {
  step: Step;
  currentStep: number;
}

const StepsThrough: React.FC<StepsThroughProps> = ({ step, currentStep }) => {
  return (
    <div
      className="flex flex-col items-center justify-between h-full"
    >
      <div className="flex items-center justify-center">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm transition-all duration-300 mb-1 ${
            step.id === currentStep || step.id < currentStep
              ? "bg-coffi-purple text-coffi-white font-medium"
              : "border bg-coffi-white border-coffi-purple text-coffi-purple font-light"
          }`}
        >
          {step.id}
        </div>
      </div>
      {step.id !== 3 && (
        <div
          className={`w-[1px] h-[110%]  bg-coffi-purple transition-all duration-300 ${
            step.id === currentStep || step.id < currentStep ? "bg-coffi-purple" : "bg-coffi-black"
          }`}
        />
      )}
    </div>
  );
};

export default StepsThrough;
