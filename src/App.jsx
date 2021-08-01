import React, { useState } from "react";
import tinygradient from "tinygradient";
import tinycolor from "tinycolor2";
import "./kart";
import "./kart/color";
import "./App.css";

/**
 * 		R
 *	O		P
 * 	Y		B
 * 		G
 */
//
// const red = "red";
// const green = "green";
// const blue = "blue";
// const yellow = "yellow";
// const orange = "orange";
// const purple = "purple";
// const black = "black";
// const white = "white";
//
// const terrain = {
//     sand: "",
//     dirt: "",
//     water: "",
//     road: "",
//     gravel: "",
//     ice: ""
// };
//
// function random(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//
//     // The maximum is exclusive and the minimum is inclusive
//     return Math.floor(Math.random() * (max - min)) + min;
// }
//
// function generateLetter() {
//     const color = [random(0, 255), random(0, 255), random(0, 255)];
//     return tinycolor(color);
// }
//
// const mergeAttributes = tinycolor.mix;
// const breedBodies = (a, b) => {};
//
// const round = (num, precision = 2) => {
//     const decimal = 10 ** precision;
//     return Math.round((num + Number.EPSILON) * decimal) / decimal;
// };
//
// const rgbCompare = (a, b) => {
//     const ca = tinycolor(a).toRgb();
//     const cb = tinycolor(b).toRgb();
//     // console.log(a, b, ca, cb)
//     return round(1 - Math.abs(ca.r - cb.r + ca.g - cb.g + ca.b - cb.b) / 765);
// };
//
// const reduceStrategy = {
//     add: (comparator) => (comparator, score, v1, v2) => {
//         return state + comparator(v1, v2);
//     },
//     subtract: (comparator) => (comparator, score, v1, v2) => {
//         return state - comparator(v1, v2);
//     },
//     set: (comparator) => (comparator, score, v1, v2) => {
//         return comparator(v1, v2);
//     }
// };
//
// const postStrategy = {
//     average(attributes, value) {
//         return value / length;
//     }
// };
//
// /**
//  * Possible Scenarios
//  * - total
//  * - average
//  * - every
//  * - some
//  * -
//  */
//
// class Scenario {
//     static type = "scenario";
//
//     static isScenario(maybeScen) {
//         return (maybeScen.type = Scenario.type);
//     }
//
//     static eval(scenario, body, strategy, postStrategy = (v) => v) {
//         if (scenario && !body) {
//             if (Scenario.isScenario(scenario))
//                 return (body) => Scenario.eval(scenario, body);
//             else return (s) => Scenario.eval(s, scenario);
//         }
//
//         const value = Object.entries(scenario.attributes).reduce(
//             (acc, [name, scenValue]) => {
//                 const bodyValue = body.attributes[name];
//
//                 // get color vectors
//                 // compare color vector -> single value between 0 - 1
//
//                 return strategy(acc, value, body.attributes[name]);
//             },
//             0
//         );
//
//         return postStrategy(value);
//
//         // 	(score, [ name, value ]) => score + compareColors(value, body.attributes[name])
//         // 	,0
//         // ) / Object.values(scenario.attributes).length
//     }
// }
//
// class Body {
//     static type = "body";
//
//     static isBody(maybeBody) {
//         return (maybeBody.type = Body.type);
//     }
// }
//
// const primaryScenarios = {
//     black: {
//         name: "black",
//         type: Scenario.type,
//         attributes: {
//             a: black
//             // b: red
//         }
//     },
//     white: {
//         name: "white",
//         type: Scenario.type,
//         attributes: {
//             a: white
//             // b: red
//         }
//     },
//     grey: {
//         name: "grey",
//         type: Scenario.type,
//         attributes: {
//             a: white,
//             b: black
//         }
//     },
//     red: {
//         name: "red",
//         type: Scenario.type,
//         attributes: {
//             a: red
//             // b: red
//         }
//     },
//     yellow: {
//         name: "yellow",
//         type: Scenario.type,
//         attributes: {
//             a: yellow
//             // b: yellow
//         }
//     },
//     blue: {
//         name: "blue",
//         type: Scenario.type,
//         attributes: {
//             a: blue
//             // b: blue,
//         }
//     }
// };
//
// const bodies = {
//     black: {
//         name: "black",
//         type: Body.type,
//         attributes: {
//             a: black,
//             b: black,
//             score: 0
//         }
//     },
//     white: {
//         name: "white",
//         type: Body.type,
//         attributes: {
//             a: white,
//             b: white,
//             score: 0
//         }
//     },
//     red: {
//         name: "red",
//         type: Body.type,
//         attributes: {
//             a: red,
//             b: red,
//             score: 0
//         }
//     },
//     orange: {
//         name: "orange",
//         type: Body.type,
//         attributes: {
//             a: orange,
//             b: orange,
//             score: 0
//         }
//     },
//     yellow: {
//         name: "yellow",
//         type: Body.type,
//         attributes: {
//             a: yellow,
//             b: yellow,
//             score: 0
//         }
//     },
//     blue: {
//         name: "blue",
//         type: Body.type,
//         attributes: {
//             a: blue,
//             b: blue,
//             score: 0
//         }
//     }
// };
//
// const scenarioScore = Object.values(primaryScenarios).map((scen) =>
//     Object.values(bodies).reduce(
//         (table, body) => {
//             table[body.name] = Scenario.eval(scen, body);
//             return table;
//         },
//         { scenario: scen.name }
//     )
// );
//
// console.table(scenarioScore);
//
// // console.log(tinycolor.mix( 'red', 'yellow'))
// const rgb = (r = 0, g = 0, b = 0) => `rgb( ${r}, ${g}, ${b} )`;
//
// // const red = rgb(255);
// // const green = rgb(0, 255);
// // const blue = rgb(0, 0, 255);
//
// const seg = (color, length) => ({
//     color,
//     length
// });
//
// const toRBGObject = (color) => tinycolor(color).toRgb();
//
// const mergeColors = (arr, currentIndex, amount = 50) => {
//     const nextIndex = currentIndex + 1;
//
//     if (arr.length === nextIndex) return arr[currentIndex];
//     const color = toRBGObject(arr[currentIndex]);
//     const nextColor = toRBGObject(arr[nextIndex]);
//     return tinycolor.mix(color, nextColor, amount);
// };
//
// const mergeSegments = (seg1, seg2) => {
//     const firstHalf = seg1.length / 2;
//     const secondHalf = seg2.length / 2;
//     const length = firstHalf + secondHalf;
// };
//
// console.log();
//
// const track = [seg(red, 5), seg(yellow, 4), seg(blue, 3), seg(red, 4)];
//
// const totalLength = track.reduce((sum, seg) => sum + seg.length, 0);
//
// const res = track.reduce(
//     (state, { color, length }) => {
//         state.list.push({ color, pos: state.pos / totalLength });
//         state.pos += length;
//         return state;
//     },
//     { list: [], pos: 0 }
// ).list;
//
// const gradient = tinygradient(res);

function App() {
    const [ count, setCount ] = useState( 0 );

    return (
        <div className="App">
            {/* <div*/}
            {/*    id="bar"*/}
            {/*    style={{*/}
            {/*        width: "100vw",*/}
            {/*        height: "10vh",*/}
            {/*        background: gradient.css()*/}
            {/*    }}*/}
            {/* ></div>*/}
            {/* <div>*/}
            {/*    /!**/}
            {/*	  Array(10)*/}
            {/*		  .fill(0)*/}
            {/*		  .map((_, i) => tinycolor.mix("red", "yellow", i * 10).toRgbString())*/}
            {/*		  .map( s => <div style={{ background: s, width: "10vw", height: "10vh" }}/> )*/}
            {/*  *!/*/}
            {/* </div>*/}
        </div>
    );
}

export default App;
