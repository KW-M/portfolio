import Img1 from "./carousel/1.jpeg?lqip";
import Img2 from "./carousel/2.jpeg?lqip";
import Img3 from "./carousel/3.jpeg?lqip";
import Img4 from "./carousel/4.jpeg?lqip";
import Img5 from "./carousel/5.jpeg?lqip";
import Img6 from "./carousel/6.jpeg?lqip";
import Img7 from "./carousel/7.jpeg?lqip";
import Img8 from "./carousel/8.jpeg?lqip";
import Img9 from "./carousel/9.jpeg?lqip";
import Img11 from "./carousel/11.jpeg?lqip";
import Img12 from "./carousel/12.jpeg?lqip";
import Img13 from "./carousel/13.jpeg?lqip";
import Img14 from "./carousel/14.jpeg?lqip";
import Img99 from "./carousel/99.jpeg?lqip";

const credit = '<br/><small class="ml-auto relative">Photo by Cailin Nygren</small>';
const mecredit = '<br/><small class="ml-auto relative">Photo by Kyle Worcester-Moore</small>';
// export const _mediaSlides = [Img1, Img10, Img3, Img4, Img5,
//     Img6, Img7, Img8, Img9, Img11, Img12, Img13, Img2,
// ].map((lqip) => ({ type: "img", ...lqip }));


export const _mediaSlides = [
    {
        type: "img",
        alt: "Members of the public learning about EcoHus at OCSD `23" + credit,
        ...Img1
    },
    {
        type: "img",
        ...Img2,
        alt: "EcoHus awards at OCSD `23"
    },
    {
        type: "img",
        alt: "In-house developed Soliculture plant-boosting solar panels" + mecredit,
        ...Img3
    },
    {
        type: "img",
        alt: "EcoHus bedroom incorporating reclaimed wood" + mecredit,
        ...Img4
    },
    {
        type: "img",
        alt: "EcoHus family area" + credit,
        ...Img5
    },
    {
        type: "img",
        alt: "Kitchen with energy-saving smart appliances" + credit,
        ...Img6
    },
    {
        type: "img",
        alt: "Integrated living and dining space" + credit,
        ...Img7
    },
    {
        type: "img",
        alt: "Dining nook looking out to the mixed outdoor living space" + credit,
        ...Img8
    },
    {
        type: "img",
        alt: "Kids bedroom" + credit,
        ...Img9
    },
    {
        type: "img",
        alt: "ADA Accessible bathroom" + credit,
        ...Img11
    },
    {
        type: "img",
        alt: "Exterior city garden with recycled water system" + credit,
        ...Img12
    },
    {
        type: "img",
        alt: "Early EcoHus CAD design concept",
        ...Img13
    },
    {
        type: "img",
        alt: "The EcoHus design & build team" + credit,
        ...Img14
    },
    {
        type: "img",
        alt: "EcoHus under construction" + credit,
        ...Img99
    },

]
