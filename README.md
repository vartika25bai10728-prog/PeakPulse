
# PeakPulse

An autonomous rescue drone website/app that detects victims, navigates obstacles, and alerts rescue teams.





## Problem Faced

Mountain climbers, trekkers, and rescue teams face extreme challenges in high-altitude and snow-covered regions. Harsh weather conditions, avalanches, hypothermia, oxygen deprivation, dehydration, and difficult terrain often leave victims stranded and difficult to locate.

Traditional search-and-rescue operations are:

- Time-consuming
- Resource-intensive
- Risky for rescue personnel
- Inefficient in low-visibility environments
## Project Overview

PeakPulse is a neuromorphic search-and-rescue drone website designed for disaster-prone mountain and avalanche regions.

Inspired by the human nervous system, the website uses brain-inspired event-driven processing and reflex-like decision-making to:

- Detect victims in distress
- Navigate hazardous environments
- Avoid obstacles autonomously
- Prioritize emergency situations
- Alert rescue teams in real time
- Communicate with stranded victims using audio and visual signals


## Neuromorphic Innovation

Unlike traditional AI systems that continuously process all incoming data, PeakPulse follows a neuromorphic approach.

Traditional Approach
```
    Camera Feed --> Process Every Frame--> High Power Consumption
```

Neuromorphic Approach

```
    A[Environmental Event] --> B[Event Detection]
    B --> C[Spiking Neural Network]
    C --> D[Navigation Decision]
    D --> E[Action Triggered]
```

The system only reacts when meaningful environmental changes occur, similar to how biological neurons respond to stimuli.


Key Neuromorphic Features

- Event-driven sensing
- Spiking Neural Networks (SNNs)
- Reflex-inspired obstacle avoidance
- Adaptive learning behavior
- Low-power decision making
## Features

### 1. Victim Detection
The Website identifies individuals who may require assistance through:

- Thermal signatures
- Lack of movement
- Distress gestures
- Abnormal posture detection
- Environmental risk assessment

### 2. Adaptive Navigation
The Website continuously adapts its route based on:

- Terrain conditions
- Obstacles
- Weather conditions
- Search priorities

### 3. Reflex-Based Obstacle Avoidance
Inspired by human reflex actions:
```
Obstacle Detected
       ↓
Immediate Response
       ↓
Path Correction
```
This allows fast and safe navigation in complex environments.


### 4. Accessibility Features
Audio Assistance

The system can announce:\
"Rescue drone detected. Stay calm. Help is on the way."

Useful during:
- Snowstorms
- Fog
- Low visibility situations


### 5. Visual Signaling
LED-based communication:

- Rescue confirmation
- Directional guidance
- Emergency signaling

Useful for:

- Hearing-impaired individuals
- Night operations


## Architecture
```
Thermal Camera
RGB Camera
Microphone
GPS Sensors

Environmental Sensors
        │
        ▼
Event Detection Layer
        │
        ▼
Spiking Neural Network
        │
        ▼
Decision-Making Engine
        │
        ▼
Navigation System
        │
        ▼
Rescue Alert Dashboard
```
## Tech Stack

**Programming -**
JavaScript

**Machine Learning -**
snnTorch

**Neuromorphic Computing -**
Spiking Neural Networks (SNN)

**Backend -**
JavaScript




## Work Flow

*Step 1*
\
Website surveys disaster zone.

*Step 2*
\
Sensors detect environmental events.

*Step 3*
\
Neuromorphic processing analyzes critical information.

*Step 4*
\
Victims are detected and classified based on risk.

*Step 5*
\
Website navigates safely using adaptive obstacle avoidance.

*Step 6*
\
Emergency alerts are sent to rescue teams.

*Step 7*
\
Audio and visual guidance assist victims.
## Demonstration Scenario

**Avalanche Rescue Mission**

1. Avalanche occurs in a mountain region.
2. PeakPulse is deployed.
3. Thermal sensors detect a stationary heat signature.
4. The system avoids rocks and trees autonomously.
5. The system classifies the victim as high priority.
6. Rescue coordinates are transmitted.
7. Audio guidance reassures the victim until help arrives.
## Expected Impact

**Faster Rescue Operations**
\
Reduces victim search time significantly.

**Improved Survival Rates**
\
Earlier detection increases rescue success.

**Reduced Risk to Rescue Teams**
\
Autonomous scouting minimizes human exposure.

**Energy-Efficient Intelligence**
\
Neuromorphic processing lowers computational load and power consumption.
## Future Scope

**Robotic Drone**
\
Real Drone coordinating search operations.

**Real Event Cameras**
\
Neuromorphic vision sensors for faster perception.

**Edge Neuromorphic Hardware**
\
Deployment on specialized chips such as:

- Intel Loihi
- IBM TrueNorth

**Satellite Integration**
\
Large-scale disaster monitoring.

**Emergency Supply Delivery**
\
Delivery of:

- Water
- Medical kits
- GPS beacons
- Thermal blankets
## Why PeakPulse

✅ Real-world impact

✅ Strong neuromorphic relevance

✅ Adaptive decision-making

✅ Disaster-management application

✅ Accessibility-focused design

✅ Scalable architecture

✅ Energy-efficient intelligence
## Screenshots

![App Screenshot](https://dummyimage.com/468x300?text=App+Screenshot+Here)


**Logo**
<img width="1028" height="1018" alt="Screenshot 2026-06-13 205019" src="https://github.com/user-attachments/assets/6c4243d8-46f2-4cb0-9a4f-04b230614593" />



## Team

**Project Name:** PeakPulse

**Hackathon:** NeuroNex'26

**Category:** Neuromorphism in robotics and drone

**Team Name:** Dual Core

**Team Members:** Vartika Tomar(Team Leader) and Vedant Tomar
