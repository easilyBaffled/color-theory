- [x] move shell after it's creation
- [x] apply collision from body to other bodies
- [x] why is the shell not moving
- [x] create change tile color item

<details>
  <summary><strong>Shield</strong></summary>

- [x] What will the shield do?

> When played it will absorb hits for a body. So when the shielded body collides with something the body will not lose moves and will not end their turn.

- [x] How should the shield work? boolean? number?

> If the shield value was a number than I could tick down based on the number of cards that would be lost.
> Doing that would mean I would have to check if the shield would burst or just say the shield will absorb everything when it hits 0, but still benefit you if it has more to go
> Additionally by making the shield a number you could play as many as you like, and I just have to add a number to it.

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

<details>
  <summary><strong>Boost</strong></summary>

- [x] what is the boost

> Boosting is the ability to increase your current speed and top speed for a limited amount of time

- [x] How Will it work

> I think it will only last for one turn but all of your moves should be given increased value, which would result in you getting more cards.
> Which, without the max card limit would let you go forever perhaps
> it should increase your eval score by a certain amount and increase the max card limit for the turn

    - [x] Does color matter

> Color should be ignored, this is a flat number applied after the color eval

    - [x] What’s the distance with transparent?

> currently, nothing because I don't factor in the alpha in a color

    - [x] How will it be applied to a body

> it can be a boolean flag on the body, like crashed and then easily read off the body when needed

    - [x] How will it be measured in the eval

> shouldn't be more than a `+ body.boost ? BOOST : 0`

    - [x] How will it be reset

> it can be done in the same place as `crashed`

    - [x] What happens when you play more than one?

> for the sake of simplicity nothing

- [x] create `Boostable` typedef
- [x] make `playABoost` function
- [x] add reading the boost to eval
- [x] count boost in turns
- [x] reset boost at end of turn
- [x] boost in UI

</details>

<details>
  <summary><strong>Rendering Shield</strong></summary>
- [x] transparent border?
- [x] Rgba a=1 border?
- [x] Else margin *or* border, for player
</details>

<details>
  <summary><strong>Rendering Boost</strong></summary>
- [x] icon/emoji?
</details>

<details>
  <summary><strong>Rendering shell</strong></summary>
- [x] circle
</details>

- [ ] How should rendering work?
- [ ] move all rendering to “component” files

<details>
	<summary>
		<strong>Refactor Rendering</strong>
	</summary>

- [ ] How should rendering work?

> I would like to separate the "rendering" from the "component".
> Where **in the current scope** `components` is the css definition for a piece of state.
> **in the current scope** Rendering provides each component with a rendering target,
> specifically (**in the current scope**) a `%c `.
> This gives the render functions with two responsibilities,
> first they have to get pass state to the components and get the result,
> second they have to align all the targets and state.
> My experience has me thinking about rendering using a nested structure
> but using `console.log` makes it a very strange double flat structure.
> I need some functionality to help reconcile that. This is most going to be a factor in the `renderWorld`.
> The other issue with the nested issue is for something like `kart` which is a composed form of `body` as is shell.
> This shouldn't be _too_ hard to reconcile, as I only need to care about string concatenation.

- [x] move all rendering to “component” files

> I realized that thing that I want, separating changing state and rendering,
> requires an amount of work that I don't want to make right now.
> There may be ways to do it, but the one that comes to mind is essentially React
> where I have a function to **commit** all changes to state and use that function to trigger a render.
> It would result in a significant change in my code structure and reduce the amount of freedom that I have right now.
>
> I would be tempted to throw a proxy on `world` and hid the "committing" like how `immer` works,
> but I could windup with either a lot of renders as I update small things in what should be a batch,
> or I would have to flag situations for the `commit` to ignore
>
> As another example, I really don't like that I am calling `renderWorldState` _in_ `moveShell`
> because it creates and awkward implicit dependency.

</details>

<details>
	<summary>
		<strong>Separation</strong>
	</summary>
	- [ ] Move all verbs to standalone files
	- [ ] Move all state building to dir
	- [ ] what state updates should hook into rendering so that I can share the changes across webRTC and have everyone
	  render accordingly (shell moving is currently moving outside of the normal looping)
</details>

<details>
  <summary><strong>WebRTC</strong></summary>
- [X] https://surma.dev/things/comlink-webrtc/
- [ ] https://github.com/GoogleChromeLabs/comlink/tree/29a1c8b3e3d2498383f35f432791c674c1d761d2/docs/examples/webrtc
- [ ] https://glitch.com/edit/#!/comlink-webrtc?path=README.md%3A1%3A0
- [ ] https://webrtc.org/getting-started/peer-connections
- [ ] https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel
</details>

Thoughts

- what if each item has a cost and color, so you have to spend any amount of cards to equal that cost additional color
  can change affects of things so green, red, blue shell all have different costs and effects
- make entity types boolean flags so body is 0001, item is 0010 shell is 010 green 1000 so green shell would be 1110
	- you can use text-decoration in console https://codepen.io/nikki-peel/pen/zYovZmv
