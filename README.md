<center><img src="./frontend/public/images/logo.svg" height="50px"/></center>

# **EcoTrack** - **Carbon Footprint Tracker**

## 🚀 **Overview**

Welcome to **EcoTrack**, your personal **carbon footprint tracker**. 🌱
EcoTrack helps you measure and understand your **carbon emissions** from everyday activities. Whether it's transportation, electricity usage, or diet habits, EcoTrack provides **insightful** feedback on how you can reduce your carbon footprint and live a more **sustainable** life. 🌿

By assessing six key lifestyle categories, EcoTrack provides you with:

* **Carbon footprint calculation**
* **Visual data in engaging charts**
* **Personalized sustainability tips** 🌎

---

## 💡 **Key Features**

* **💼 Multistep Form**: Collect data step-by-step on transportation, energy, diet, shopping, and more.
* **⚡ Real-time Calculation**: Get instant feedback on your carbon footprint.
* **📊 Visual Analytics**: View your carbon emissions with interactive **doughnut charts**.
* **🌱 Personalized Tips**: Receive actionable advice on reducing emissions, based on your lifestyle choices.
* **🔒 Secure Authentication**: Log in and track your progress over time.
* **📱 Responsive Design**: Access EcoTrack from any device, anytime.

---

## 🛠️ **Tech Stack**

### **Frontend**

* **React**: A dynamic UI framework for building interactive web applications.
* **Vite**: A lightning-fast development build tool.
* **Tailwind CSS**: For quick and easy styling with utility-first CSS.
* **GSAP**: To animate the UI.
* **Chart.js**: To visualize your carbon footprint breakdown.
* **Lucide-React**: For a beautiful set of scalable icons.

### **Backend**

* **Node.js**: A JavaScript runtime for the backend.
* **Express.js**: A minimalist web framework for building RESTful APIs.
* **MongoDB**: A NoSQL database to store user and footprint data.
* **openAi Sdk**: To generate ai tips.
* **JWT (JSON Web Tokens)**: Secure user authentication and authorization.

---

## 📂 **Project Structure**

```bash
/dothp-harshu-ecotrack/
  ├── frontend/                      # Frontend application
  │   ├── src/
  │   ├── public/
  │   ├── package.json
  └── server/                        # Backend API and data handling
      ├── controllers/
      ├── models/
      ├── routes/
      ├── package.json
```

---

## 🏗️ **Installation Guide**

### **Prerequisites**:

* **Node.js** and **npm** (or **yarn**) installed.
* A **MongoDB** database set up locally or via a cloud provider like MongoDB Atlas.

### **Steps**:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dothp-harshu/ecoTrack.git
   cd ecoTrack
   ```

2. **Install frontend dependencies**:

   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**:

   ```bash
   cd server
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the `server/` directory:

   ```env
         MONGOOSE_STRING=mongodb://localhost:27017/ecotrack
         JWT_SECRET=klajdkljfalfjldk
         OPENROUTER_API_KEY= 

   ```

5. **Run the backend server**:

   ```bash
   cd server
   npm start
   ```

6. **Run the frontend**:

   ```bash
   cd frontend
   npm run dev
   ```

Now, go to [http://localhost:5173](http://localhost:5173) to interact with the app! 🎉

---

## 🧑‍🤝‍🧑 **How to Use EcoTrack**

### **Step 1: Input Your Data**

Fill out the **interactive form** with your everyday habits:

* **Transportation** 🚗: How do you travel?
* **Energy** ⚡: What’s your electricity usage?
* **Diet** 🍽️: What's your eating habit?
* **Shopping** 🛒: How often do you shop and make deliveries?
* **Water Consumption** 🚿: How do you manage water usage?

### **Step 2: View Your Carbon Footprint**

Once you’ve completed the form, **EcoTrack** will calculate your carbon footprint. The app will display:

* **Your total emissions** in **kg CO₂/month**.
* A **breakdown of emissions** by category (e.g., transport, electricity, diet).

### **Step 3: Track and Improve Your Impact**

You’ll receive personalized tips for reducing your carbon footprint. 🌍 Each category will provide insights like:

* **Sustainable travel options** 🚶
* **Energy-saving habits** 💡
* **Eco-friendly diet suggestions** 🥦

## 📊 **Interactive Visuals**

* **Doughnut Chart**: See a visual representation of your carbon footprint across categories.
* **Interactive Data**: Click on the chart segments to learn more about the specific category.
* **Carbon Reduction Tips**: Each tip will show how much CO₂ you can save by following it.

---


## 🎉 **Let’s Make the World Greener Together!** 🌍

Start your journey towards a **more sustainable future** today with **EcoTrack**! 🌿

---

