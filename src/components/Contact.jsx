import '../contact.css';
import { useState, useEffect } from 'react';
import {baseUrl, periodMonth} from '../utils/constants.js';

const Contact = () => {
    const [planets, setPlanets] = useState(() => {
        const planets = JSON.parse(localStorage.getItem('planets'));
        if (planets && (Date.now() - planets.timestamp < periodMonth)) {
            return planets.payload;
        }
    });

    useEffect(() => {
        if (!planets) {
        fetch(baseUrl + '/v1/planets')
            .then(response => response.json())
            .then(data => {
                const planets = data.map(planet => planet.name);
                setPlanets(planets);
                localStorage.setItem('planets', JSON.stringify({
                    payload: planets,
                    timestamp: Date.now()
                }));
            })
            .catch(error => console.error('Error fetching planets:', error));
        }
    }, []);

    return (
        <div className="container">
            <form>

                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Your name.." />

                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" name="lastname" placeholder="Your last name.." />

                <label htmlFor="planet">Planet</label>
                <select id="planet" name="planet">
                    {planets && planets.map((planet, index) => (
                        <option key={index} value={planet}>
                            {planet}
                        </option>
                    ))}
                </select>

                <label htmlFor="subject">Subject</label>
                <textarea id="subject" name="subject" placeholder="Write something.." style={{ height: '200px' }}></textarea>

                <input type="submit" className="btn btn-danger mx-1" value="Submit" />

            </form>
        </div>
    )
}

export default Contact;