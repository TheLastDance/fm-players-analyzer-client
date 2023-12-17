export const tutorial = [
  "If you still have problems, don't worry! Start by customizing your FM game view to display all 47 attributes of each player, as the app relies on this information for skill calculation, so it is a must.",
  "In the game view, select players using checkboxes from squad, scout shortlist, or players in range sections. Use ctrl + A to select all players, then capture the view with ctrl + P or the Print Screen option in the FM menu. Save the captured view as an Web Page (html file).",
  "Inside the app's templates section, you can create roles/positions based on your game vision. Use drag and drop to organize attributes into tiered containers, each with a specific coefficient for overall skill calculation. The algorithm multiplies selected attributes by their tier coefficients, sums them, then divides by the sum of all used coefficients, and lastly multiplies it by 5.5 to show more fifa/pes like overalls. Tier coefficients are as follows: tier_1 (10), tier_2 (3.5), tier_3 (1), tier_4 (0.25), no_tier will not include attributes in calculation at all.",
  "Enable or disable templates using checkboxes. This determines whether they are used in the calculation process and displayed in the results table. Templates can also be deleted.",
  "You also can change the app language to translate attributes accordingly.",
  "Click on a player's row in the table to view their profile with all attributes.",
  "Rearrange technical and goalkeeping skills containers within a player's profile using drag and drop.",
  "The app supports uploading players with masked attributes, using a default value of 10 for fully masked attributes and an average for ranges. Be cautious when uploading players with numerous fully masked attributes, as it may result in less accurate outcomes.",
  "The app is compatible with various Football Manager versions. It has been tested with FM20 and FM23.",
]

export const rules = [
  "Only the 47 skill attributes are necessary for the view. Other data is optional, providing flexibility.",
  "Ensure the app language matches the language of your HTML file. New languages will be added based on the quantity of requests. Contact me via email to suggest additional languages.",
  "You can upload files with less than 25000 players.",
  "Assign unique names to each template or ensure they have a different case at the very least.",
  "Remember that clearing browser cookies/cache will delete app data. Using incognito mode will not save changes, but it won't delete data from non-incognito mode.",
  "Please be aware that every browser has a capacity limit of 10 mb for application data. Therefore, if you upload a data exceeding 10 mb, your table data will not be stored.",
  "Currently, you can create up to 10 templates. However, I am open to expanding this limit if the application gains popularity.",
]