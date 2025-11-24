# Candidate Dashboard - Complete Guide

## 📁 File Structure

```
src/
├── app/
│   └── dashboard/
│       └── candidate/
│           ├── page.js                    ← Main Dashboard
│           ├── profile/page.js            ← Profile Management
│           ├── applications/page.js       ← Job Applications
│           ├── saved-jobs/page.js         ← Bookmarked Jobs
│           ├── messages/page.js           ← Messaging
│           ├── meetings/page.js           ← Interviews/Meetings
│           ├── ai-tools/page.js           ← AI Tools Hub
│           ├── subscription/page.js       ← Billing & Plans
│           ├── reports/page.js            ← Analytics
│           └── settings/page.js           ← Account Settings
│
├── components/
│   ├── ui/
│   │   └── CandidateSidebar.jsx          ← Navigation Sidebar
│   └── layouts/
│       └── CandidateDashboardLayout.jsx  ← Layout Wrapper
```

---

## 🎨 Design System

### Colors (From tailwind.config.js)
- **Primary Aqua**: `#36D0D8` (brand-aqua)
- **Secondary Orange**: `#EF522E` (brand-orange)
- **Accent Yellow**: `#FDD140` (brand-yellow)
- **Dark Navy**: `#021126` (brand-black)
- **Gradient**: Aqua to Teal (`#36D0D8` → `#0C5B65`)

### Typography
- **Headers (H1-H3)**: Monument Extended (font-display)
- **Body Text**: Montserrat Alternates (default sans)

### Spacing & Corners
- **Gutters**: 24px (px-8, py-8)
- **Corner Radius**: rounded-lg (12px)
- **Card Shadows**: shadow-md, shadow-lg

---

## 🏗️ Main Dashboard Features

### 1. Hero Banner
**Location**: Top of page  
**Content**:
- Title: "Candidate Dashboard"
- Subtitle: "Track your job search, messages, and interviews in one place."
- Background: Aqua-to-teal gradient

### 2. KPI Cards (Row 1)
Four summary cards displaying key metrics:

| Card | Icon | Color | Data | Trend |
|------|------|-------|------|-------|
| Applications | DocumentTextIcon | Aqua | 24 | ▲ 12.5% |
| Interviews Scheduled | CalendarIcon | Orange | 3 | Neutral |
| Saved Jobs | BookmarkIcon | Yellow | 18 | ▲ 5.8% |
| Shortlisted by Employers | UserPlusIcon | Emerald | 7 | ▼ 2.3% |

**Interaction**: Each card is clickable and deep-links to the respective section.

**Responsive Behavior**:
- **Desktop** (lg): 4 columns
- **Tablet** (sm-md): 2×2 grid
- **Mobile**: Stacked vertically

---

### 3. Recent Applications Table (Row 2 - Left)

**Features**:
- Displays 6-8 recent job applications
- All applications are for "Product Designer" roles across different companies:
  - Figma
  - Paystack
  - Flutterwave
  - Interswitch
  - Andela
  - Kuda Bank

**Columns**:
| Column | Description |
|--------|-------------|
| Job Title | Position name + location |
| Company | Logo + company name |
| Status | Colored badge (Under Review, Shortlisted, Interview Scheduled, Applied, Rejected) |
| Date Applied | Formatted date |
| Actions | View (aqua button) / Withdraw (red button) |

**Status Badge Colors**:
- **Under Review**: Blue (`bg-blue-100 text-blue-700`)
- **Shortlisted**: Emerald (`bg-emerald-100 text-emerald-700`)
- **Interview Scheduled**: Purple (`bg-purple-100 text-purple-700`)
- **Applied**: Neutral (`bg-neutral-100 text-neutral-700`)
- **Rejected**: Red (`bg-red-100 text-red-700`)

**Withdraw Modal**:
- Confirmation popup with warning icon
- Shows company and position name
- "Cancel" and "Yes, Withdraw" buttons
- Success toast notification on confirm

**Responsive Behavior**:
- **Desktop/Tablet**: Full table view
- **Mobile**: Converts to card layout with condensed info and "⋯" dropdown

---

### 4. Upcoming Interviews (Row 2 - Right)

**Features**:
- Stacked interview cards
- Shows 3 upcoming interviews

**Each Card Contains**:
- Company logo
- Employer name
- Role title
- Date and time
- Meeting type (Zoom/Google Meet)
- **Action Buttons**:
  - **Join [Meeting Type]** (aqua, full-width)
  - **Reschedule** (border button, 50% width)
  - **Add to Calendar** (border button, 50% width)

**Empty State**:
- Calendar icon (large, neutral gray)
- Message: "No interviews yet"
- CTA button: "Practice with AI Interview Simulator"

**Sample Interview Data**:
1. Paystack - Product Designer - Oct 30, 2:00 PM (Zoom)
2. Flutterwave - Product Designer - Nov 2, 10:30 AM (Google Meet)
3. Figma - Product Designer - Nov 5, 4:00 PM (Zoom)

---

### 5. Messages Quick Tab (Row 3 - Left)

**Features**:
- Preview of 3-5 most recent messages
- Unread badge count (red circle with number)
- "View All →" link to full Messages page

**Each Message Preview**:
- Sender avatar (circular profile image)
- Sender name + title (e.g., "Sarah Johnson, HR Manager, Paystack")
- Job title reference (e.g., "Re: Product Designer")
- Message snippet (truncated)
- Time received (e.g., "2 hours ago")
- **Unread indicator**: Blue background + left border for unread messages

**Hover Effect**:
- Subtle shadow lift on hover
- Background color change on hover

**Sample Messages**:
1. Sarah Johnson (Paystack) - "Congratulations! You've been shortlisted..."
2. Michael Chen (Figma) - "Thank you for your application. We would like to..."
3. Amara Okafor (Flutterwave) - "Your portfolio is impressive! Let's discuss..."
4. David Williams (Andela) - "We appreciate your interest..."

---

### 6. Quick Actions (Row 3 - Right)

**Layout**: 2×2 grid of action buttons

| Action | Icon | Color | Link |
|--------|------|-------|------|
| Upload Resume | ArrowUpTrayIcon | Aqua | /dashboard/candidate/profile#resume |
| Generate Cover Letter | DocumentDuplicateIcon | Orange | /dashboard/candidate/ai-tools/cover-letter |
| Practice Interview | AcademicCapIcon | Yellow | /dashboard/candidate/ai-tools/interview-simulator |
| Browse Jobs | MagnifyingGlassIcon | Emerald | /jobs |

**Button Styling**:
- Colored background (bg-primary-50, etc.)
- Large icon (w-8 h-8)
- Text below icon
- Hover lift animation
- Focus ring with aqua color (#36D0D8)
- Equal size squares

---

## 🔔 Global Features

### Toast Notifications
**Triggers**:
- Application withdrawn
- Interview rescheduled
- Calendar event added
- Message sent

**Design**:
- Fixed position (bottom-right)
- Success: Emerald background
- Error: Red background
- Auto-dismiss after 3 seconds
- Slide-up animation

### Tooltips
**Applied to**:
- Status badges (hover for details)
- KPI trend indicators (hover for percentage breakdown)
- Action buttons (accessibility labels)

### Skeleton Loaders
**Purpose**: Show loading state on first paint  
**Implementation**: Add skeleton components to:
- KPI cards
- Application table
- Interview cards
- Message previews

### Accessibility Features

#### Keyboard Navigation
- **Tab**: Navigate between interactive elements
- **Enter**: Activate buttons/links
- **Escape**: Close modals

#### Focus Indicators
- All interactive elements have visible focus rings
- Focus ring color: Aqua (#36D0D8)
- Offset: 2px

#### ARIA Labels
- Icons have `aria-hidden="true"` where text is present
- Buttons have descriptive labels
- Links indicate external status

### Empty States
**Locations**:
- No interviews: Calendar icon + CTA
- No messages: Envelope icon + "Check back later"
- No applications: Document icon + "Start applying"

**Design Pattern**:
- Large neutral icon (w-16 h-16 or w-24 h-24)
- Centered text
- Optional CTA button

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
- **Default (Mobile)**: 0-639px
- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

### Layout Adjustments

#### Desktop (lg and up)
- Sidebar: Fixed 256px wide
- Content: 12-column grid
- KPIs: 4 columns
- Applications/Interviews: 8/4 split
- Messages/Quick Actions: 8/4 split

#### Tablet (md)
- Sidebar: Fixed (same as desktop)
- KPIs: 2×2 grid
- Applications table: Visible
- Stacked sections (full width)

#### Mobile (default to sm)
- Sidebar: Fixed (scrollable if needed)
- KPIs: Stacked vertically
- Applications: Card layout (no table)
- Actions: Condensed "⋯" dropdown
- Interviews: Full width cards
- Messages: Full width cards
- Quick Actions: 2-column grid maintained

---

## 🧭 Sidebar Navigation

### Navigation Items
1. Dashboard (HomeIcon)
2. Profile (UserCircleIcon)
3. Job Applications (DocumentTextIcon)
4. Saved Jobs (BookmarkIcon)
5. Messages (ChatBubbleLeftRightIcon)
6. Meetings (CalendarIcon)
7. AI Tools (SparklesIcon)
8. Subscription & Billing (CreditCardIcon)
9. Reports & Analytics (ChartBarIcon)
10. Settings (Cog6ToothIcon)

### Active State
- Background: Aqua-to-teal gradient
- Text: White
- Shadow: Medium
- Icon: White

### Inactive State
- Background: Transparent
- Text: Neutral-700
- Hover: Neutral-100 background + Aqua text

### User Profile Section
**Location**: Bottom of sidebar  
**Content**:
- Avatar (circular, gradient background, initials "JD")
- Name: John Doe
- Email: john@example.com
- Logout button (red text)

---

## 🎯 Next Steps & Future Enhancements

### Priority Features to Build
1. **Full Applications Page**: Filters, sorting, search
2. **Messaging System**: Real-time chat, file attachments
3. **Calendar Integration**: Google Calendar, Outlook sync
4. **Profile Builder**: Resume upload, skills, portfolio
5. **AI Tools Hub**: Cover letter generator, interview simulator

### UX Improvements
- [ ] Add loading skeletons for all data sections
- [ ] Implement real-time notifications (WebSocket)
- [ ] Add search/filter to Recent Applications
- [ ] Pagination for applications list
- [ ] Dark mode toggle
- [ ] Export data (CSV, PDF)

### Accessibility Enhancements
- [ ] Screen reader testing
- [ ] High contrast mode
- [ ] Keyboard shortcut guide
- [ ] Voice navigation support

---

## 🚀 How to Run

1. **Navigate to the Candidate Dashboard**:
   ```
   http://localhost:3000/dashboard/candidate
   ```

2. **View in Development**:
   ```bash
   npm run dev
   ```

3. **Test Responsive Views**:
   - Open Chrome DevTools (F12)
   - Click device toolbar (Ctrl+Shift+M)
   - Test on: iPhone SE, iPad, Desktop

---

## 🎨 Design Notes for Developers

### Color Usage Philosophy
- **Aqua**: Primary actions, links, active states
- **Orange**: Secondary actions, warnings
- **Yellow**: Highlights, notifications
- **Emerald**: Success states
- **Red**: Errors, destructive actions

### Component Reusability
All UI components follow these principles:
1. **Composable**: Can be nested and combined
2. **Configurable**: Props for colors, sizes, variants
3. **Accessible**: ARIA labels, keyboard support
4. **Responsive**: Mobile-first approach

### Animation Guidelines
- **Duration**: 200-300ms for micro-interactions
- **Easing**: `ease-in-out` for smoothness
- **Transform**: Scale, translateY (avoid width/height)
- **Hover**: Lift (scale-105), shadow increase

---

## 📚 Code Examples

### Adding a New KPI Card
```javascript
const newKPI = {
  id: 'profile-views',
  title: 'Profile Views',
  count: 156,
  trend: 8.2,
  trendDirection: 'up',
  icon: EyeIcon,
  color: 'text-purple-600',
  bgColor: 'bg-purple-50',
  link: '/dashboard/candidate/profile#views',
};
```

### Creating a Toast Notification
```javascript
const showToast = (message, type = 'success') => {
  setToast({ type, message });
  setTimeout(() => setToast(null), 3000);
};

// Usage
showToast('Application withdrawn successfully', 'success');
```

### Adding a New Sidebar Item
```javascript
// In CandidateSidebar.jsx
const navigation = [
  // ... existing items
  { 
    name: 'Resume Builder', 
    href: '/dashboard/candidate/resume-builder', 
    icon: DocumentPlusIcon 
  },
];
```

---

## 💡 Learning Points for Novice Developers

### 1. Component Structure
- **Layout components** wrap pages (sidebar + content)
- **UI components** are reusable building blocks
- **Page components** assemble UI components with data

### 2. State Management
- `useState` for local state (modals, toasts)
- Props for passing data down
- Context API for global state (future enhancement)

### 3. Responsive Design
- **Mobile-first**: Default styles for mobile, then add breakpoints
- **Tailwind breakpoints**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- **Hidden/visible**: Use `hidden md:block` and `md:hidden`

### 4. Accessibility
- Always add focus states (`:focus-visible`)
- Use semantic HTML (`<nav>`, `<main>`, `<article>`)
- Provide text alternatives for icons

### 5. Performance
- Use `next/image` for optimized images
- Lazy load components below the fold
- Minimize re-renders with `useMemo` and `useCallback`

---

## 🔍 Troubleshooting

### Issue: Sidebar not showing
- Check that `CandidateDashboardLayout` wraps the page
- Verify sidebar width (w-64 = 256px)
- Ensure `ml-64` on main content

### Issue: Gradient not rendering
- Check Tailwind config extends colors
- Use `from-brand-aqua to-[#0C5B65]`
- Ensure `bg-gradient-to-r` class is present

### Issue: Icons not displaying
- Import from `@heroicons/react/24/outline`
- Check icon name spelling
- Verify icon is rendered with size class (w-6 h-6)

### Issue: Mobile layout broken
- Test with `md:hidden` and `hidden md:block`
- Check grid classes (grid-cols-1 sm:grid-cols-2)
- Verify container padding (px-4 sm:px-6 lg:px-8)

---

## ✅ Checklist for Production

- [ ] Replace mock data with API calls
- [ ] Add error boundaries
- [ ] Implement loading states
- [ ] Test on real devices (iOS, Android)
- [ ] Run Lighthouse audit (Performance, Accessibility)
- [ ] Add analytics tracking
- [ ] Implement proper authentication
- [ ] Add rate limiting for actions
- [ ] Write unit tests (Jest)
- [ ] Write E2E tests (Cypress/Playwright)

---

**Designed with ❤️ for ReadyJobSeeker**  
*Building the future of job searching, one component at a time.*


