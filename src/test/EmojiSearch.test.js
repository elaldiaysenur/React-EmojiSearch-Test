import React from "react"
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

import emojiList from "../emojiList.json";
import App from "../App";

 describe("input Test",()=>{
    let input, header,emoji,filterList
    beforeEach(()=>{
        render(<App/>)
    })
    test("Header Test",()=>{
        header=screen.getByText(/Emoji Search/i);
        expect(header).toBeInTheDocument();
        const images=screen.getAllByRole("img");
        expect(images[0]);
        expect(images[1]);
    })
    test("Emoji List Control",()=>{
        emoji=emojiList.slice(0,19);
        emoji.map((item)=>{
            expect(screen.getByText(item.title)).toBeInTheDocument()
        })
    })
    test("Emoji Filter and re-render",()=>{
        input=screen.getByRole("textbox");
        const filter="smile cat";
        filterList=emojiList.filter(
            it=>it.keywords.toLowerCase().match(filter) || it.title.toLowerCase().match(filter));
        fireEvent.change(input,{target:{value:filter}});
        expect(screen.getAllByText(/cat/i).toHaveLength(2));
    })
    test("emoji click and copy control",async()=>{
        const click=screen.getByText("Joy");
        expect(click.parentElement.getAttribute("data-clipboard-text").length).toBeGreaterThan(0);
        console.log(click.parentElement.getAttribute("data-clipboard-text"));
        expect(click.parentElement.getAttribute("data-clipboard-text")).toMatch("😂");
    })
 })