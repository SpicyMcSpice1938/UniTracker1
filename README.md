# UniTracker Course Scheduler
## Overview
UniTracker is a React-based course scheduling application designed to help students plan their semester schedule efficiently. The application emphasizes user experience through intuitive interface design, real-time feedback, and multiple view options for schedule management.

## Core Features
- Course filtering and selection
- Real-time conflict detection
- Dual view system (List and Calendar)
- Schedule finalization with validation
- Responsive design for various screen sizes

## Technical Architecture

### Key Components

#### 1. LandingPage
The entry point of the application featuring:
- Welcome message with clear call-to-action
- Dynamic button state ("Start Scheduling" vs "Edit Schedule")
- Schedule display when courses are selected
- Consistent branding with UT theme colors

#### 2. Scheduler
The main scheduling interface that handles:
- Course filtering and display
- Schedule conflict detection
- Course addition/removal
- View toggling between list and calendar formats

#### 3. ViewSchedule
A modal-based calendar view providing:
- Weekly schedule visualization
- Color-coded conflict highlighting
- Interactive course removal
- Customized calendar display for academic schedule

#### 4. DisplaySchedule
A reusable component for showing selected courses in a grid layout.

### HCI Design Principles & Implementation

#### 1. Visibility of System Status
- Real-time feedback for scheduling conflicts
- Color-coded indicators for conflicting courses (tomato for conflicts, #a7aef3 for normal)
- Clear display of selected courses
- Explicit warning messages for scheduling conflicts

#### 2. Error Prevention
```javascript
// Conflict detection implementation
let overlap = false;
let overlappingEvents = new Set();
for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
        if (events[i].start < events[j].end && events[i].end > events[j].start) {
            overlap = true;
            overlappingEvents.add(events[i].id);
            overlappingEvents.add(events[j].id);
        }
    }
}
```

#### 3. User Control and Freedom
- Ability to remove courses through multiple interfaces
- Confirmation dialogs for destructive actions
- Easy navigation between views
- Clear "Go Back" and "Go Home" options

#### 4. Consistency and Standards
- Consistent color scheme using UT brand colors
- Standardized button styling and placement
- Uniform card layouts for course information
- Consistent navigation patterns

#### 5. Recognition Rather Than Recall
- Course filtering functionality
- Visible course details in cards
- Clear labeling of all interactive elements
- Persistent schedule display

#### 6. Accessibility Features
- ARIA roles for main sections
- Semantic HTML structure
- Clear button labels
- High contrast color choices
- Screen reader compatible elements

## User Interaction Flow

1. **Initial Landing**
   - Users are greeted with a clear welcome message
   - Single, prominent call-to-action button

2. **Course Selection**
   - Filter courses using search input
   - View course details in cards
   - Add/remove courses with immediate feedback

3. **Schedule Review**
   - Toggle between list and calendar views
   - Interactive conflict resolution
   - Visual feedback for scheduling issues

4. **Finalization**
   - Validation of schedule
   - Clear confirmation of completion
   - Easy return to home or editing

## Technical Considerations

### State Management
The application uses React's Context API (`ScheduleContext`) for global state management, handling:
- Current schedule
- Course additions/removals
- Schedule validation

### UI Component Library
Utilizes Mantine UI library for:
- Consistent styling
- Pre-built components
- Responsive grid system
- Modal dialogs

### Calendar Integration
Implements FullCalendar for:
- Weekly schedule view
- Custom event rendering
- Interactive event handling
- Academic schedule customization

## Best Practices

1. **Error Handling**
   - Proactive conflict detection
   - User-friendly error messages
   - Confirmation for destructive actions

2. **Performance**
   - Efficient filtering algorithms
   - Optimized rendering with Grid system
   - Modal-based calendar view to reduce initial load

3. **Maintainability**
   - Component-based architecture
   - Clear separation of concerns
   - Reusable components (DisplaySchedule)
   - Consistent naming conventions

## Future Enhancement Recommendations

1. **Functionality**
   - Course prerequisite checking
   - Schedule export functionality
   - Multiple schedule comparison
   - Term selection capability

2. **User Experience**
   - Drag-and-drop course scheduling
   - More detailed course information
   - Custom color coding options
   - Schedule sharing capabilities

3. **Technical**
   - Unit test implementation
   - Performance optimization for larger course lists
   - Offline functionality
   - Mobile-specific optimizations
