import React, { useEffect, useState } from 'react';
import TeamImg1 from '../../assets/img/team-1.jpg';
import TeamImg2 from '../../assets/img/team-2.jpg';
import TeamImg3 from '../../assets/img/team-3.jpg';
import TeamImg4 from '../../assets/img/team-4.jpg';
import TeamImg5 from '../../assets/img/team-5.jpg';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import StaffService from '../../service/staff.service';

function TeamComponent() {
    const options = {
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    };

    const [staffs, setStaffs] = useState([]);
    useEffect(() => {
        const fetchStaffs = async () => {
            const [result, error] = await StaffService.getStaffs();
            if (error) {
                console.log(error);
                return;
            }
            setStaffs(result.data);
        }
        fetchStaffs();
    }, []);

    console.log(staffs);

    return (
        <div>
            <div className="container-fluid py-5">
                <div className="container">
                    <div
                        className="border-start border-5 border-primary ps-5 mb-5"
                        style={{ maxWidth: 600 }}
                    >
                        <h6 className="text-primary text-uppercase">Thành Viên Đội Ngũ</h6>
                        <h1 className="display-5 text-uppercase mb-0">
                            Chuyên Gia Chăm Sóc Thú Cưng
                        </h1>
                    </div>
                    <OwlCarousel
                        className="owl-carousel team-carousel position-relative"
                        style={{ paddingRight: 25 }}
                        {...options}
                    >
                        {staffs && staffs.map((staff) => (
                            <div key={staff.id} className="team-item item">
                                <div className="position-relative overflow-hidden">
                                    <img className="img-fluid w-100" src={staff?.avatar || ""} alt="" />
                                    <div className="team-overlay">
                                        <div className="d-flex align-items-center justify-content-start">
                                            <a className="btn btn-light btn-square mx-1" href="#">
                                                <i className="bi bi-twitter" />
                                            </a>
                                            <a className="btn btn-light btn-square mx-1" href="#">
                                                <i className="bi bi-facebook" />
                                            </a>
                                            <a className="btn btn-light btn-square mx-1" href="#">
                                                <i className="bi bi-linkedin" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-light text-center p-4">
                                    <h5 className="text-uppercase">{staff?.displayName || ""}</h5>
                                    <p className="m-0">{staff?.jobPosition || ""}</p>
                                </div>
                            </div>
                        ))}
                    </OwlCarousel>
                </div>
            </div>
        </div>
    );
}

export default TeamComponent;
