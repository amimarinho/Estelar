# Project Brief & PRD: Estelar

**Project Name:** Estelar  
**Context:** Global Solution 2026 · FIAP · Web Design · 2TWDOA  
**Status:** MVP Defined & Designed  
**Target Audience:** Astronauts on long-duration space missions.

---

## 1. Executive Summary
Estelar is a mental health and well-being mobile application specifically designed for the extreme isolation and psychological stress of long-term space exploration. It transforms emotional tracking into a poetic journey ("Emotional Constellation"), manages the technical reality of communication delays with Earth ("Support Radar"), and provides immediate grounding tools ("Immediate Care").

## 2. The Problem
Astronauts face unique psychological challenges:
- **Extreme Isolation:** Disconnection from family, friends, and terrestrial routine.
- **High Cognitive Load:** Constant monitoring of complex systems and mission goals.
- **Communication Latency:** The physical distance creates an asynchronous reality that traditional mental health apps don't account for.
- **Emotional Overload:** Risk of burnout and stress in a high-stakes environment.

## 3. The Solution (Key Pillars)
- **Emotional Monitoring:** Simple, non-intrusive daily check-ins.
- **Support Radar:** Asynchronous psychological support that acknowledges orbital delays.
- **Affective Connection:** Maintaining ties with "Home" through curated messages and memories.
- **Visual Poetry:** Turning data into a "Constellation" to provide a sense of progress and overcoming.

## 4. User Personas
**The Commander / Crew Member:** High-performing professionals who need a reliable, calm, and private space to process emotions without judgment, while remaining mission-ready.

---

## 5. Functional Requirements (MVP Ultra-Lean)

### 5.1. Mission Hub (aba1.missão)
- **Greeting & Context:** Personalized welcome with mission day (e.g., Day 47) and current phase.
- **Daily Check-in Prompt:** Prominent CTA to record current state.
- **Earth Synchronization:** Real-time clock and weather/status of the astronaut's home city (e.g., São Paulo).
- **Mission Cycle:** Visual indicator of the current phase (Pre-mission, Active, Post-mission).

### 5.2. Emotional Check-in (ui-01.checkin)
- **Mood Selector:** 5-point scale using spatial/calm terminology.
- **Stress & Energy Sliders:** Visual scales for quick input.
- **Sleep/Rest Tracker:** Simple confirmation of rest quality.
- **Observations:** Optional text area for brief reflections.

### 5.3. Support Radar (aba2.radar)
- **Risk Detection:** Dashboard showing mood, stress, and energy trends.
- **Earth Link:** Asynchronous communication portal with estimated response times (e.g., 18 min delay).
- **Emergency Pause:** Direct access to grounding exercises.

### 5.4. Emotional Constellation (aba5.jornada)
- **Poetic Visualization:** A star map where each star represents an emotional entry.
- **Milestones:** Highlighting "First peak overcome" or "Good moment."
- **Journey Highlights:** Categorized summaries of the mission's emotional highs and lows.

---

## 6. Design System & Visual Identity (Estelar)
- **Concept:** Spatial, calm, reliable, and cozy.
- **Color Palette (Dark Mode Primary):**
  - Surface: `#0a1030` (Deep Space Blue)
  - Primary: `#b9a7ff` (Soft Nebula Purple)
  - Accents: Warm oranges/pinks for "Affective" elements.
  - *Constraint:* No pure `#FFFFFF` or `#000000` to prevent eye strain.
- **Typography:**
  - **Space Grotesk:** High-impact headlines.
  - **Lexend:** Interface clarity and body text.
  - **Space Mono:** Mission data, clocks, and technical metrics.
- **Components:** 24px corner radius (`radius/lg`), floating tab bar, and elevated glassmorphism cards.

## 7. Future Roadmap (Post-MVP)
- **Immediate Care (Aba 3):** Guided breathing, meditations, and crew "collective pulse."
- **Earth Portal (Aba 4):** Family message capsules and programmed emotional triggers.
- **Advanced Accessibility:** High contrast modes and reduced motion for sensory overload.
- **Pre/Post Mission Tracks:** Transition protocols for returning to Earth.

---

## 8. Success Metrics
- **Engagement:** Daily completion of emotional check-ins.
- **Intervention:** Successful use of "Emergency Pause" during detected stress peaks.
- **User Satisfaction:** Qualitative feedback on the sense of "connection to Earth."
