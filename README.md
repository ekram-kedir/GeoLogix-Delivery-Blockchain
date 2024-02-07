# GeoLogix-Delivery-Blockchain

# Overview

GeoLogix-Delivery-Blockchain revolutionizes the logistics and delivery industry by leveraging blockchain technology to ensure timely and efficient deliveries within designated zones. This project aims to develop and deploy an Ethereum-based decentralized application (dApp) that automates reward payments for drivers based on their geographical compliance. By utilizing smart contracts and GPS technology, GeoLogix-Delivery-Blockchain sets a new standard in efficiency, reliability, and transparency for tech-driven logistics solutions.

# Business Need

GeoLogix-Delivery-Blockchain utilizes a location-based smart contract to facilitate automatic payments for drivers who adhere to specified geographic zones for set durations. Drivers' smartphones transmit GPS data to an Ethereum smart contract, which processes cryptocurrency transactions as payments when compliance conditions are met. Deviations from the assigned area result in a reduction of the driver's internal rating, while adherence leads to higher ratings and rewards. An ERC20 token is integrated into the smart contract, providing additional incentives to drivers who consistently meet compliance criteria.

# Project Setup
# Prerequisites

- Node.js and npm installed
- Hardhat installed globally (npm install -g hardhat)
- Flutter installed (for mobile development)

# Cloning the Repository
Clone the Repository: Open your terminal and navigate to the directory where you want to clone the repository. Then, run the following command to clone the repository:

- git clone https://github.com/ekram-kedir/GeoLogix-Delivery-Blockchain.git

# Running the Project

# Backend (Smart Contract)

Navigate to the smart-contract directory: Use the cd command to navigate to the smart-contract directory:

- cd GeoLogix-Delivery-Blockchain/contract

Compile the Smart Contracts: Run the following command to compile the smart contracts:

- npx hardhat compile

Deploy the Contracts: Deploy the contracts to a testnet or local Ethereum network as per your requirements.

# Frontend (React)

Navigate to the frontend directory: Use the cd command to navigate to the frontend directory:

- cd ../frontend

Install Dependencies: Run the following command to install dependencies:

- npm install

Start the Development Server: Run the following command to start the development server:

- npm start

This will launch the React app in your default web browser.

# Mobile (Flutter)

Navigate to the mobile directory: Use the cd command to navigate to the mobile directory:

- cd ../mobile

Run the App: Run the following command to run the Flutter app on an emulator or connected device:

- flutter run

This will build and run the Flutter app on the selected device.

# Accessing the Project

Once you have completed the above steps, you should be able to access and interact with the GeoLogix-Delivery-Blockchain project:
- Frontend (React): Open your web browser and navigate to http://localhost:3000 to access the React app.
- Mobile (Flutter): The Flutter app will be launched on the emulator or connected device, allowing you to interact with it directly.

# License
This project is licensed under the MIT License.