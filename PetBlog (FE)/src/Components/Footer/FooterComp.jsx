import React from 'react';

const Footer = () => {
    return (
        <footer id="footer" className="text-center text-lg-start text-muted">
            <hr></hr>
            <section className="d-flex justify-content-center justify-content-lg-between p-4">
                <div className="me-5 d-none d-lg-block">
                    <span className='headers'>Get connected with me on Social Networks:</span>
                </div>
                <div>
                    <a href="https://www.linkedin.com/in/daniel-nikolov-1090aa233/" target="_blank" className="me-4 fs-5 text-reset">
                        <i className="fab fa-linkedin"></i>
                        LinkedIn
                    </a>
                    <a href="https://github.com/NikolovDaniel" target="_blank" className="me-4 fs-5 text-reset">
                        <i className="fab fa-github"></i>
                        GitHub
                    </a>
                </div>
            </section>
            <hr></hr>
            <section className="">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="headers text-uppercase fw-bold mb-4">
                                <i className="fas fa-gem me-3"></i>Daniel Nikolov
                            </h6>
                            <p className='fs-5'>
                            SoftUni Student and Mentormate (Intern). Exploring the world of ASP.NET and other technologies while creating various Web applications to test my knowledge.
                            </p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 fw-bold">
                            <h6 className="headers text-uppercase fw-bold mb-4">
                                Projects
                            </h6>
                            <p>
                                <a target="_blank" href="https://github.com/NikolovDaniel/RacketSpeed" className="text-reset">Racket Speed</a>
                            </p>
                            <p>
                                <a target="_blank" href="https://github.com/NikolovDaniel/PetsBlog" className="text-reset">Pets Blog</a>
                            </p>
                            <p>
                                <a target="_blank" href="https://github.com/NikolovDaniel/Projects/tree/master/Players%20Statistics%20(ASP.NET%20MVC)" className="text-reset">Player Statistics</a>
                            </p>
                            <p>
                                <a target="_blank" href="https://github.com/NikolovDaniel/Projects/tree/master/Knights%20and%20Dragons%20(Console%20Application)" className="text-reset">Knights and Dragons</a>
                            </p>
    
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 fw-bold">
                            <h6 className="headers text-uppercase fw-bold mb-4">Contact</h6>
                            <p><i className="fas fa-home me-3"></i> Sofia, Bulgaria</p>
                            <p>
                                <i className="fas fa-envelope me-3"></i>
                                kace123@abv.bg
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <hr></hr>
            <div className="text-center p-4">
                © 2023 Copyright:
                <a className="text-reset fw-bold" target="_blank" href="https://github.com/NikolovDaniel">github.com/NikolovDaniel</a>
            </div>
        </footer>
    );
};

export default Footer;