import { gsap } from "gsap";

// ALL of these are now FREE! 🎉
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { GSDevTools } from "gsap/GSDevTools";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { TextPlugin } from "gsap/TextPlugin";

// Register plugins
gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  DrawSVGPlugin,
  MorphSVGPlugin,
  SplitText,
  Flip,
  GSDevTools,
  MotionPathPlugin,
  Physics2DPlugin,
  TextPlugin
);


export { 
  gsap, 
  ScrollTrigger, 
  ScrollSmoother,
  ScrollToPlugin,
  DrawSVGPlugin, 
  MorphSVGPlugin, 
  SplitText, 
  Flip, 
  GSDevTools,
  MotionPathPlugin,
  Physics2DPlugin,
  TextPlugin
};