# What the heck is this thing?
> WHY IS THERE ANOTHER SESHAN.XYZ FRONTEND???

This is, like React Seshan.XYZ, an experimental frontend for my website.

*Unlike* the other experimental website, which is a pretty standard "Create React App" website, 
this one is interesting for a few reasons:
* Fully Server Side Rendered (No Client-Side JS)
* Designed with very old browsers in mind (Simple HTML)

Introducing **React Seshan.XYZ - Fundamentals for Legacy PCs!** :tada:

This website uses the ReactDOMServer to render everything to HTML, and is served by Express. (It's also transpiled by 
Babel to support Node 4.x, mostly because the that's the latest version of NodeJS that Ubuntu 16.04 on the PowerMac G5 has).
