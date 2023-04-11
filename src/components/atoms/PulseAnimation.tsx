import { CreateAnimation } from "@ionic/react";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
}

const PulseAnimation = ({ children }: Props) => {
  const unmatchAnimationRef = useRef<CreateAnimation>(null);

  const pulseKeyframes = [
    { offset: 0, transform: "scale(1)" },
    { offset: 0.3, transform: "scale(1.1)" },
    { offset: 0.5, transform: "scale(1)" },
    { offset: 0.7, transform: "scale(1.2)" },
    { offset: 1, transform: "scale(1)" },
  ];

  return (
    <CreateAnimation
      duration={1000}
      iterations={1}
      keyframes={pulseKeyframes}
      ref={unmatchAnimationRef}
    >
      {children}
    </CreateAnimation>
  );
};

export default PulseAnimation;
