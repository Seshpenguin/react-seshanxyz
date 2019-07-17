# React Seshan.XYZ
This is an *experimental* React frontend to the current WordPress site.

[https://seshan.xyz/react/](https://seshan.xyz/react/)

## How?
WordPress exposes a pretty thorough JSON API at `/wp-json`. This React App is completely client side, 
and fetches the actual site content using the WordPress API. This basically makes WordPress a headless CMS.

## Why??
Mostly for fun. I want to play with React more, so why not create yet another version of my website!

## What will happen to xyzwp???
[`xyzwp`](https://github.com/Seshpenguin/xyzwp/) (the current WordPress theme) will stay for the foreseeable future as the default version as my website. This 
React frontend will be available available alongside the regular site.

The current plan is when I'm satisfied with this React frontend, it will become the default version of the site. `xyzwp` 
will become the "legacy browser" version (which, as the name implies, will work on old browsers). We'll probably rework 
`xyzwp` so that it plays nice with *really* old browsers (say, < IE 6), which will probably mean removing Materialize and 
writing some custom CSS.

