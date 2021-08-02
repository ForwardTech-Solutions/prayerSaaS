# Tom's PrayerSaaS (pre-alpha)

## To Do's
this is how i keep track of stuff.  ik it sucks

<details >
<summary>Past to do's</summary>

### todo pre 5/27
- prayer GETall GETone GETme PUT
- group GET PUT

### todo 5/27
- move groups to bottom of sidebar
- layout prayer cards like google keep
- 'add prayer' as a button w/ popup 
    
### todo 6/14 (and other dates before)
- refactor app into more disconnected components

- research routing
    - set up an individual page for prayers using rounting

- distinguish 'data for this user' from 'all data'
    - API: get prayers by group 
    - API: user object (prayers, groups)


### todo 6/15 
- refactor Dashboard into more components
    - seperate add prayer button into its own thing
    - seperate {user}'s prayers into its own thing

- set up more routing    https://reactrouter.com/web/guides/quick-start 
    - make myPrayers and individualPrayers replace the current area that add a prayer and {user}'s prayers occupy


### todo july
- create static URL pages that can un-authorized accept prayers to a specific destination.  Make this url the destination of ^
        - something like /addPrayerTo/group/:id
            - only load page successfully if :id is valid
                - create a new endpoint for unvalidated people to submit a groupid to see if its real and accepts unauthorized
        - create a new API endpoint that can unauthorized check if a group accpets unauthorized requests
            - i need to refactor all of prayer to have fields like 
                - source
                - prayerGroupID
                - fullName
            - prayergroups need fields
                - accepts_unauthorized_requests

- blast a list to an email group
    - create a 'email groups' tab on sidebar to view all the groups infos


- create a QR code to accept prayers into a group
    - use this npm: https://www.npmjs.com/package/react-qrcode-logo 
    - create a microservice that lets you create QR codes and choose what to link them to and change what they link to
        -   have a dynamo table of key/destination pairs where key is the URL generated for the QR (and the value of the code)
            and the destination is where you are redirected todo
    
    
- captcha 



### todo july
- add captcha to accept prayer (currently just on email signup)


</details> 
<!-- End of "Past to do's dropdown" -->





##  ---- todo (currently working on)  ----
##  --------------------------------------
- write tests for email blast, redirect page, qr, and captcha
- Document use-cases and work flows
- optimize for mobile 
    -  **unauthorized screens** first
    - others if it's easy 



### todo other 
- move all API hardcodes to environment variables
- Format emails in email blasts to be pretty 
- Complete style refresh
- fix bugs

### todo long term: 
- figure out how i wanna do prayer groups vs email groups (together or seperate)
        - validate that the group is a real group
- incoroporate testing
- figure out what the benefit of this platform even is
    - Update: been working on that.  it is a set of tools to empower churches to create active and powerful prayer cultures



## test to write:      
- list page 
    - 'blast this page to group' button exists
        - an accurate list of groups pops up
        - if one is clicked, emails are sent
            - email contains the prayer data (description, author, group)
- redirect page
    - make sure the feedback is accurate
    - make sure it redirects correctly

- QR Object
    -QR Image displays





## bugs: 
   - currentUser gets replaced with [ ] (blank) sometimes ((on dashboard.js))
   - email response ((on email signup)) page says "Successful" on any network reply, not only success
   - clicking on one list link ((on the sidebar)) and then a different one does not change the screen, only the URL
   - you can have duplicates prayers in a list and can do so by just adding them to a list again 




