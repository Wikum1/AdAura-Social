AdAura Social — Portfolio Website (HTML/CSS/JS)

How to run
- Open index.html in your browser.
- (Recommended) Use VS Code "Live Server".

Quick edits
1) Business email
   - index.html: change the mailto link near "Contact Us" (currently info@adaurasocial.com)
   - index.html: change the hidden input value:
     <input type="hidden" id="toEmail" value="info@adaurasocial.com" />

2) WhatsApp number
   - Replace 94703493357 wherever it appears:
     https://wa.me/94703493357

3) Add real projects / done works
   - Open script.js
   - Edit the PROJECTS array at the top.
   - For each project, set:
     title, type (reels/design/ads/branding), desc, tags, img
   - Put your real images inside:
     adaura-portfolio/assets/work/
     and update img like: "assets/work/my-image.jpg"

Notes
- The contact form uses "mailto" (opens the visitor’s email app).
- If you want a true online form (no email app), connect Formspree / Formsfree and update the submit handler in script.js.
