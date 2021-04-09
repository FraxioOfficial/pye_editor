import React from 'react';
import ReactDom from "react-dom";
import { Button, Input, Form, InputGroup, CustomInput } from 'reactstrap';
import { layersLoaded } from './action/layerActions';

const MODAL_STYLES = {
    position: "fixed",
    width: "90%",
    height: "90%",
    top: "5%",
    left: "5%",
    transform: "translate(0%,0%)",
    padding: "0px",
    background: "ivory",
    border: "2px solid red",
    opacity: 1,
    zIndex: 1000

}
const OVER_STYLES = {
    position: "relative",
    top: "0",
    width: "100%",
    height: "100%",
    left: "0",
    bottom: "0",
    right: "0",
    background: "limegreen",
    opacity: 0.6,
    padding: "0",
    zIndex: 1000

}

export default function Modal({ open, children, onClose, layer, layers, rulerChange, priceFeed, onSwitch, goResetLayer, goSaveLayer }) {
    if (!open) return null;
    console.log(layers, priceFeed);



    return ReactDom.createPortal(<>
        <div style={OVER_STYLES}></div>
        <div style={MODAL_STYLES}>
            <div className="row pt-3" style={{ width: "100%" }}>
                <div className="col-10" style={{ width: "75%" }}><h3 className="ml-3">{children}for Layer {layer}</h3></div>
                <div className="col-2"><Button onClick={onClose} className="btn-danger ml-5" style={{ width: "35px", float: "right" }}>x</Button></div>
            </div>
            <hr />
            <div className="p-3">
                <h6>Dynamic Input</h6>
                <Form>
                    <div className="row">
                        <div className="col-4 pb-2">

                            <Input type="select" id={layer} name="select" onChange={onSwitch}>
                                <option key="DEFAULT" id="default" value="default">----</option>

                                <option key="ETH" id={layer} value={(window.web3.utils.fromWei(priceFeed["0"], "Mwei") / 100).toFixed(2)}>{`ETH - ${(window.web3.utils.fromWei(priceFeed["0"], "Mwei") / 100).toFixed(2)} $`}</option>
                                <option key="BTC" id={layer} value={(window.web3.utils.fromWei(priceFeed["1"], "Mwei") / 100).toFixed(2)}>{`BTC - ${(window.web3.utils.fromWei(priceFeed["1"], "Mwei") / 100).toFixed(2)} $`}</option>
                                <option key="LINK" id={layer} value={(window.web3.utils.fromWei(priceFeed["2"], "Mwei") / 100).toFixed(2)}>{`LINK - ${(window.web3.utils.fromWei(priceFeed["2"], "Mwei") / 100).toFixed(2)} $`}</option>
                            </Input>
                            <Input type="text" id="oracle_path" placeholder="Oracle" />
                            <h6>Triggers </h6>
                            <InputGroup >
                                {console.log(layers[layer].obj, "tween check")}
                                <Input type="text" id="top_form" placeholder="Top" style={{ background: "limegreen" }} />
                                <Input type="text" id="mid_form" placeholder="Mid" style={{ background: "cornflowerblue" }} />
                                <Input type="text" id="start_form" placeholder="Start" style={{ background: "lightblue" }} />
                                <Input type="text" id="low_form" placeholder="Low" style={{ background: "cornflowerblue" }} />
                                <Input type="text" id="bottom_form" placeholder="Bottom" style={{ background: "tomato" }} />
                                <Input type="text" id="costom_form" placeholder="Custom" style={{ background: "beige" }} />
                            </InputGroup>
                            <h6>Active</h6>
                            <InputGroup >
                                <Input type="button" id="top" style={{ width: "32px", background: "limegreen" }} />
                                <Input type="button" id="mid" style={{ width: "32px", background: "cornflowerblue" }} />
                                <Input type="button" id="start" style={{ width: "32px", background: "lightblue" }} />
                                <Input type="button" id="low" style={{ width: "32px", background: "cornflowerblue" }} />
                                <Input type="button" id="bottom" style={{ width: "32px", background: "tomato" }} />
                                <Input type="button" id="costom" style={{ width: "32px", background: "beige" }} />
                            </InputGroup>
                            {
                                layers.map(lay => (
                                    // console.log(layer),
                                    lay.key.toString() === layer.toString() ?
                                        <div key={layer} name={layer}>
                                            <h6>X Position //{lay.obj.alpha !== null ? lay.obj.alpha.x : lay.obj.start.x}</h6>
                                            <CustomInput type="range" id="x" name={layer} min="-750" max="750" value={lay.obj.alpha !== null ? lay.obj.alpha.x : lay.obj.start.x} onChange={rulerChange} />
                                            <h6>Y Position // {lay.obj.alpha !== null ? lay.obj.alpha.y : lay.obj.start.y}</h6>
                                            <CustomInput type="range" id="y" name={layer} min="-430" max="430" value={lay.obj.alpha !== null ? lay.obj.alpha.y : lay.obj.start.y} onChange={rulerChange} />
                                            <h6>Scale {lay.obj.alpha !== null ? lay.obj.alpha.z : lay.obj.start.z}</h6>
                                            <CustomInput type="range" id="z" name={layer} min="1" max="120" value={lay.obj.alpha !== null ? lay.obj.alpha.z : lay.obj.start.z} onChange={rulerChange} />
                                            <h6>Transparancy / Opacity {lay.obj.alpha !== null ? lay.obj.alpha.o : lay.obj.start.o}</h6>
                                            <CustomInput type="range" id="o" name={layer} min="0" max="100" value={lay.obj.alpha !== null ? lay.obj.alpha.o : lay.obj.start.o} onChange={rulerChange} />
                                            <h6>Rotation {lay.obj.alpha !== null ? lay.obj.alpha.r : lay.obj.start.r}</h6>
                                            <CustomInput type="range" id="r" name={layer} min="-360" max="360" value={lay.obj.alpha !== null ? lay.obj.alpha.r : lay.obj.start.r} onChange={rulerChange} />
                                            <Button id={lay.key} className="btn-success" onClick={goSaveLayer}>{`SAVE ${lay.key}`}</Button><Button id={lay.key} className="btn-danger" onClick={goResetLayer}>RESET</Button>
                                        </div> : null
                                ))}
                        </div>
                        <div className="col-8" style={{}}>
                            Screen Preview
                            <div style={{
                                backgroundImage: `url("https://ipfs.io/ipfs/QmTNbkJ5x3iY4VEiEUARfrCreqBZ3tXHU3oFnsUK7QnDie")`,
                                width: "485px", height: "280px", overflow: "hidden", position: "relative", top: "20px", left: "0"
                            }}>
                                {
                                    console.log(layer),
                                    layers.map(laya => (
                                        console.log(laya.key),
                                        laya.key.toString() === layer.toString() ? <div key={laya.key} style={{ width: "485px", height: "280px", position: "absolute", top: "0", left: "0", overflow: "hidden" }}>
                                            {laya.obj.alpha !== null ? <img id="layers[layer].obj.alpha" src={`https://ipfs.io/ipfs/${laya.path}`} style={{
                                                position: "absolute", top: `${laya.obj.alpha.y * 2 / 3}px`, left: `${laya.obj.alpha.x * 2 / 3}px`,
                                                width: `${(laya.obj.alpha.z / 100 * ((750 * 2 / 3) - 20))}px`, opacity: `${laya.obj.alpha.o / 100}`, transform: `rotate(${laya.obj.alpha.r}deg)`
                                            }} /> : <img id="layers[layer].obj.alpha" src={`https://ipfs.io/ipfs/${laya.path}`} style={{
                                                position: "absolute", top: `${laya.obj.start.y * 2 / 3}px`, left: `${laya.obj.start.x * 2 / 3}px`,
                                                width: `${(laya.obj.start.z / 100 * ((750 * 2 / 3) - 20))}px`, opacity: `${laya.obj.start.o / 100}`, transform: `rotate(${laya.obj.start.r}deg)`
                                            }} />}
                                        </div> : null
                                    ))}
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </>, document.getElementById("portal")
    )
}