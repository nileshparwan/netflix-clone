import React from 'react';
import './Footer.css';
import { footerOne } from './Footer.json';

const FooterSectionOne = ({ item }) => {
    return (
        <div className="footer__row footer__middle">
            <div className="footer__middle__row">
                {
                    item.map((item, index) => (
                        <div className="footer__middle__col" key={index}>
                            <ul>
                                {
                                    item?.item.map((element, key) => (
                                        <li key={key}>
                                            <a href={element.url || ""}>
                                                {element?.title}
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};


function Footer() {

    return (
        <div className="footer">
            <FooterSectionOne item={footerOne} />
        </div>
    );
}

export default Footer;