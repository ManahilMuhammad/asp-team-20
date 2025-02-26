import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {gapi} from 'gapi-script';

const CLIENT_ID = "30612243520-tp9t9cht1uji1csgq9kcunrvh0dphd7s.apps.googleusercontent.com";
const API_KEY = "AIzaSyB6y88d2g0BCGHQZg6MqJWBfJokXI4fc-8";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const HomePage = () => {
    const navigate = useNavigate();
    const [caloriesLeft, setCaloriesLeft] = useState<number>(950);
    const [events, setEvents] = useState<{date: string; summary: string;}[]>([]);
    const [isAuthorised, setIsAuthorised] = useState(false);

    // Loading the google calendar api
    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,  
            }).then(() => {
                gapi.auth2.getAuthInstance().isSignedIn.listen(setIsAuthorised);
                setIsAuthorised(gapi.auth2.getAuthInstance().isSignedIn.get());
                });
            }
        gapi.load('client:auth2', start);    
        }, []);

    // Fetching events from google calendar
    const fetchEvents = async () => {
        if (!isAuthorised) {
            await gapi.auth2.getAuthInstance().signIn();
            setIsAuthorised(true);
        }
        gapi.client.calendar.events.list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            maxResults: 7,
            singleEvents: true,
            orderBy: "startTime",
        }).then(response => {
            const items = response.result.items || [];
            setEvents(items.map(event => ({
                date: event.start.date || event.start.dateTime.split("T")[0],
                summary: event.summary || "No Title",
            })));
        });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 lg:flex-row lg:justify-center lg:items-center lg:space-x-12">
            {/* Header: NutriFit */}
            <div className="absolute top-6 left-6 lg:top-6 lg:left-10">
                <h1 className = "text-3xl font-bold text-[#5A8E5A]">NutriFit</h1>
            </div>

            {/* Profile Icon */}
            <div className= "absolute top-6 right-6 lg:top-10 lg:right-16">
                <img
                    src="https://placehold.co/50"
                    alt="Profile"
                    className="w-12 h-12 rounded-full border border-gray-300"
                />
            </div>

            {/* Fetch Calendar Events */}
            <div className="absolute top-20 flex space-x-3 lg:top-16">
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <div key={index} className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
                            index === 3 ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-700"
                        }`}>
                            {new Date(event.date).getDate()}
                        </div>
                    ))
                ) : (
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={fetchEvents}>
                        Connect Google Calendar
                    </Button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:w-full lg:max-w-5xl">
                {/* Calories Circle */}
                <div className = "relative w-64 h-64 mt-12 lg:w-80 lg:h-80 lg:mt-0 lg:ml-12">
                    <CircularProgressbar
                        value={(caloriesLeft / 2000) * 100}
                        styles={buildStyles({
                            textColor: "transparent",
                            pathColor: "#5A8E5A",
                            trailColor: "#FF4B4B",

                        })}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-4xl font-bold text-[#5A8E5A] lg:text-5xl">{caloriesLeft}</span>
                        <span className="text-lg text-gray-700 lg:text-xl">calories left!</span>
                    </div>
                </div>
                    
                {/* Action Buttons */}
                <div className= "w-full max-w-lg mt-8 lg:mt-0 lg:ml-16">
                    <div className="space-y-4">
                        <Button className = "w-full flex justify-between items-center bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-full shadow-lg text-lg" onClick = {() => navigate("/saved-recipes")}>Saved Recipes <span className="text-xl">➜</span></Button>
                        <Button className = "w-full flex justify-between items-center bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-full shadow-lg text-lg" onClick={() => navigate("/suggested-recipes")}>Suggested Recipes <span className="text-xl">➜</span></Button>
                        <Button className = "w-full flex justify-between items-center bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-full shadow-lg text-lg" onClick={() => navigate("/meal-planner")}>Meal Planner <span className="text-xl">➜</span></Button>
                        <Button className = "w-full flex justify-between items-center bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-full shadow-lg text-lg" onClick={() => navigate("/search-recipe")}>Search Recipe <span className="text-xl">➜</span></Button>
                    </div>
                </div>
            </div>
            {/* Settings Icon */}
            <div className= "absolute bottom-6 lg:bottom-12">
                <button className= "w-12 h-12 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                    ⚙️
                </button>
            </div>
        </div>
    );
};

export default HomePage;