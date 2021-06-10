import React from "react";
import './index.scss';


const About = () => {

    return (
        <div className="About">
            <h1>О нас</h1>
            <div className="contentNumber"><span className="black">Генеральный директор</span> - Хмель Денис Николаевич</div>
            <div className="contentNumber"><span className="black">Телефоны</span>: 8(904) 852-35-39</div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d1004.8937431507142!2d45.17503797415851!3d53.198955311982914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x4141a9bfc5fd9fcd%3A0xc684177c87509d83!2z0JHRgNCw0YLRgdC60LDRjyDRg9C7LiwgMjMsINCX0LDRgNC10YfQvdGL0LksINCf0LXQvdC30LXQvdGB0LrQsNGPINC-0LHQuy4sIDQ0Mjk2MA!3m2!1d53.1992974!2d45.1740644!5e0!3m2!1sru!2sru!4v1623348918318!5m2!1sru!2sru"
                width="600"
                height="450"
                style={{border: 0}}
                allowFullScreen=""
                loading="lazy"
            />
        </div>
    )
}

export default About;
