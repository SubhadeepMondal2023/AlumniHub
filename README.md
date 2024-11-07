# AlumniHub

# user
route.post('/login')
route.post('/register')
route.get('/myprofile',isAuthenticated)
route.put('/update-profile',isAuthenticated)
route.post('/update/password',isAuthenticated)
route.post('/forgot-password')
route.post('/reset-password')
route.post('/verify-otp')



# alumni
route.get('/get-all-alumni?location&company&designation&exp',isAuthenticated)
route.get('/get-profile?id=iajahfuh',isAuthenticated)
route.post('/create-new-job-post',isAuthenticated)
route.delete('/delete-job-post',isAuthenticated)


# job
route.get('/jobs/get-all-jobs?type&exp&location&date&company',isAuthenticated)
route.get('/jobs/apply?jobid=1993883',isAuthenticated)
route.get('/get-application-status?jobid&userid',isAuthenticated)
route.get('/withdraw-application?jobid&userid',isAuthenticated)

# groups
route.get('/get-group?groupid',isAuthenticated)
route.post('/create-group',isAuthenticated)
route.get('/group-members/:groupid',isAuthenticated)
route.post('/add-group-member',isAuthenticated)
route.post('/remove-group-member',isAuthenticated)
route.post('/message/add',isAuthenticated)
route.delete('/message/delete',isAuthenticated)
POST /groups - Create a new group (body: { groupName, description }).
PUT /groups/:groupId - Update group details.
DELETE /groups/:groupId - Delete a group.
GET /groups/:groupId/members - Fetch all members in a specific group.
DELETE /groups/:groupId/members/:userId - Remove a user from the group.
# event
create,update,delete.

# donation
GET /all-donations(admin)
POST /donations
GET /donations/history
POST /events/:eventId/donate


# admin
route.get('/get-all-user',isAuthenticated,isAuthorized("admin"))
route.post('/update/role',isAuthenticated,isAuthorized("admin"))
route.put('/update/group?parameters',isAuthenticated,isAuthorized("admin"))


