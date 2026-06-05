
# Bug Added

## Backend

### BUG #B1
**Category:** Authorization

**Expected:** Users can only view their own notes.

**Actual:** Users can view all notes created by all users.

---

### BUG #B2
**Category:** Creation

**Expected:** Creating a note succeeds and returns **HTTP 201 Created**.

**Actual:** Note creation succeeds, but the API returns an error response with **HTTP 401 Unauthorized**.

---

### BUG #B3
**Category:** Deletion

**Expected:** Deleting a note successfully removes it from the database and note list.

**Actual:** Delete API returns a success response with **HTTP 204 No Content**, but the note is not actually deleted.

---

### BUG #B4
**Category:** Profile API Response Consistency

**Expected:** Successfully fetching profile data returns a successful response with consistent status information.

**Actual:** Profile data is returned successfully, but the API response contains:
- `success: false`
- `status_code: 432`
- `last_login_count: 999`

which does not match the actual request outcome.

---

## Frontend

### BUG #F1
**Category:** Authorization

**Expected:** Users without valid credentials cannot access route `/`.

**Actual:** Users without valid credentials can access route `/`.

---

### BUG #F2
**Category:** Loading State

**Expected:** During note creation, the submit button enters a loading state and returns to its normal state after the backend responds.

**Actual:** Loading state remains active even after the backend response is received.

---

### BUG #F3
**Category:** Data Mismatch

**Expected:** Profile page displays correct user information and statistics.

**Actual:**
- Username field displays email.
- Email field displays username.
- Notes count does not match backend data (`notes_count + 19`).

---

### BUG #F4
**Category:** Profile Status Consistency

**Expected:** Profile page status indicators should accurately reflect the API response.

**Actual:**
- Profile loads successfully.
- Success message is displayed.
- Success flag is shown as `false`.
- Custom status code `432` is displayed despite a successful profile fetch.

---

### BUG #F5
**Category:** Logout

**Expected:** Logout clears all stored credentials/session data and redirects the user to `/login`.

**Actual:** Logout is not functional and redirects to `/logout`, but the route does not exist.

---

### BUG #F6
**Category:** Data Submission.

**Expected:** First Name entered during registration should be saved and sent to backend.

**Actual:** First Name is validated on frontend but never sent to backend.

---

### BUG #F7
**Category:** Data Submission.

**Expected:** Email entered during registration should be saved and sent to backend.

**Actual:** Email is validated on frontend but never sent to backend.


---

### BUG #F8
**Category:** Validation.

**Expected:** every field must need validation

**Actual:** only email has validation (or 2 fields).

---

### BUG #F9
**Category:** Validation.

**Expected:** Expected: Last Name must contain at least 3 characters.

**Actual:** Actual: Last Name validation only checks for empty value.

---

### BUG #F10
**Category:** Data Integrity.

**Expected:** User profile should contain First Name and Email entered during registration.

**Actual:** Registration succeeds but profile does not contain First Name and Email.

---

