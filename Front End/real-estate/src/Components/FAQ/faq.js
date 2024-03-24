import { useState } from 'react'
import './faq.css'
import { Link } from 'react-router-dom'
const FAQ = () => {
    let data = [
        {
            dataId: 1,
            question: "How do I start my home search on your website?",
            answer: "Simply navigate to the search bar on our homepage and enter your desired location, property type, price range, and any other specific criteria you're looking for. Hit enter, and you'll be presented with a list of available properties matching your search.            "
        },
        {
            dataId: 2,
            question: "What types of properties can I find on your website?",
            answer: "Our website lists a variety of properties including single-family homes, condos, apartments, townhouses, land plots, commercial properties, and more.            "
        },
        {
            dataId: 3,
            question: "Can I save properties for later viewing?            ",
            answer: "Yes, you can create an account on our website which allows you to save properties to your favorites list, making it easy to revisit them later."
        },
        {
            dataId: 4,
            question: "How frequently is the website updated with new listings?            ",
            answer: "We strive to update our listings regularly to ensure you have access to the latest properties on the market. However, the frequency of updates can vary depending on market conditions and other factors.            "
        },
        {
            dataId: 5,
            question: "Are the property listings on your website accurate and up-to-date? ",
            answer: "We make every effort to ensure the accuracy and timeliness of our listings. However, please note that availability and pricing of properties can change rapidly, so we recommend contacting the listing agent or seller directly for the most current information.            "
        },
        {
            dataId: 6,
            question: "Do you offer assistance with buying or selling a property? ",
            answer: "While we primarily serve as a platform for property listings, we may offer resources and connections to reputable real estate agents or agencies in your area upon request."
        },
        {
            dataId: 7,
            question: "Are there any fees for using your website?",
            answer: "No, browsing and searching for properties on our website are completely free of charge. However, there may be fees associated with specific services or transactions, such as listing a property or engaging a real estate agent.            "
        },
        {
            dataId: 8,
            question: "How can I get in touch with the seller or listing agent?",
            answer: "Each property listing on our website includes contact information for the seller or listing agent. You can reach out to them directly via phone or email for inquiries or to schedule viewings.            "
        },
        {
            dataId: 9,
            question: "Do you provide financing options for purchasing a property? ",
            answer: "While we do not directly offer financing, we may be able to connect you with reputable lenders or mortgage brokers who can assist you with financing options tailored to your needs.            "
        },
        {
            dataId: 10,
            question: "How can I report inaccuracies or issues with a property listing? ",
            answer: "If you encounter any inaccuracies or issues with a property listing, please contact our customer support team immediately. We take accuracy and integrity seriously and will promptly investigate and address any concerns raised by users."
        }
    ]

    const datas = data.map((d) => {
        return (<>
            <div className='col-6'>
                <div className="card" style={{ margin: "10px" }}>
                    <div className="card-body">
                        <h5 className="card-title">{d.dataId}.  {d.question}</h5>
                        <p className="card-text" style={{ paddingTop: "20px" }}> {d.answer}</p>
                    </div>
                </div>
            </div>
        </>)
    })
    return (
        <>
            <div className="container">
                <div className="bodyfaq row" style={{ paddingBottom: "20px" }}>
                    <h1>Frequently Asked Questions</h1>
                </div>
                <div className='row bodyfaq' style={{ paddingTop: "10px" }}>
                    {datas}
                </div>
                <div className='bodyfaq row' style={{ paddingTop: "70px" }}>
                    <div className='col'>
                        <div className='text' style={{ textAlign: "center" }}>Need help? Talk to our expert.</div>
                    </div>
                    <div className='col' >
                        <div className='row'>
                            <div className='col'></div>
                            <div className='col' style={{ margin: "11px 10px 8px 8px" }}><Link to="/contact"><div className='btn btn-white' style={{ padding: "13px", border: "1px solid black" }}>Contact Us </div></Link></div>
                            <div className='col' style={{ margin: "11px 10px 8px 8px" }}><Link to="#"><div className='btn btn-white bg-black text-white' style={{ padding: "13px", border: "1px solid black" }}> 9986758464 </div></Link></div>
                            <div className='col'></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FAQ