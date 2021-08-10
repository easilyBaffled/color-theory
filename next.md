- [x] move shell after it's creation
- [x] apply collision from body to other bodies
- [x] why is the shell not moving
- [x] create change tile color item

<details>
  <summary><strong>Shield</strong></summary>

- [x] What will the shield do?

> When played it will absorb hits for a body. So when the shielded body collides with something the body will not lose moves and will not end their turn.

- [x] How should the shield work? boolean? number?

> If the shield value was a number then I could tick down based on the number of cards that would be lost.
> Doing that would mean I would have to check if the shield would burst or just say the shield will absorb everything when it hits 0, but still benefit you if it has more to go
> Additionally by making the shield a number you could play as many as you like and I just have to add a number to it.

- [x] How to play the shield?

> `{card}.shield()` I will not care about the shield's color

- [x] How to mark a shielded body?

> ```javascript
> {
> 	shield: 0
> }
> ```

- [x] Add `playAShield`
- [x] How to read a shielded body - in collision?
- [x] How to update a shielded body - in collision?
- [x] Confirm it all works

> The way it is written now, I save the shield value ahead of time because a shell's `crashed` comes _after_ `remove` so the crashed could read the 0 cause by its shell.
> So for now a shield makes you completely invulnerable on a tile no matter what hits you when you enter.

</details>

### Boost

- [ ] create boost item - increase max number of cards for x turns
- [ ] https://surma.dev/things/comlink-webrtc/
- [ ] https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel

Thoughts

- what if each item has a cost and color, so you have to spend any amount of cards to equal that cost additional color
  can change affects of things so green, red, blue shell all have different costs and effects
- make entity types boolean flags so body is 0001, item is 0010 shell is 010 green 1000 so green shell would be 1110
