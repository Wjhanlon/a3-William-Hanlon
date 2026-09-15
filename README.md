Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

2. Deploy your project to Render and fill in the appropriate fields in your package.json file.
3. Test your project to make sure that when someone goes to your main page on Render, it displays correctly.
4. Ensure that your project has the proper naming scheme `a3-yourfirstname-yourlastname` so we can find it.
5. Fork this repository and modify the README to the specifications below.
6. Create and submit a Pull Request to the original repo. Name the pull request using the following template: `a3-firstname-lastname`.



## Equipment Request Form

A link to your project running on render.

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

- the goal of the application
- challenges you faced in realizing the application
- what authentication strategy you chose to use and why (choosing one because it seemed the easiest to implement is perfectly acceptable)
- what CSS framework you used and why
  - include any modifications to the CSS framework you made via custom CSS you authored

The goal of this application is for a user to be able to request a piece of equipment, when they need it by, and urgency levels, and then they are able to see all of their open requests on the table on the right. They are able to modify or delete their request whenever. I used Auth0 for authentication, as it was the implementation of oAuth2 that I was most familiar with, and adding a connection for GitHub only takes seconds. I used TailwindCSS for the framework, as I really enjoy the utility of it. I feel that it makes it easier for me to spot hierarchy issues and to make sure flex is working the way I intend. I did not modify the framework css with any custom, however I did add a script in package.json to monitor my index.html, to add any rules that may not be in the file by default to tailwind.css (this was suggested by their website).
<img width="2559" height="1271" alt="image" src="https://github.com/user-attachments/assets/857a070d-1808-4dbb-953c-2c28533c0245" />
<img width="2559" height="1265" alt="image" src="https://github.com/user-attachments/assets/73840cf6-f3bd-4645-a7a3-b581d06bda68" />


## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via Auth0 to add authentication to my project. One thing to note is that because an Auth0 account can only create one tenant per free account, this project is in the same workspace as another project of mine. This will not mean anything for signing in through google or Github, however if you were able to access the global sign up page for the workspace, it would say something like "sign up to Movie Compass to continue to Webware A3." I am not quite sure how you would be able to do this, but it may be possible rarely.
- **Tech Achievement 2**: I achieved 100% in all four lighthouse tests consistently. 
<img width="2559" height="1270" alt="image" src="https://github.com/user-attachments/assets/49cb061b-4bdc-41d9-9c72-b1b3a3df9e81" />


### Design/Evaluation Achievements
- None implemented
