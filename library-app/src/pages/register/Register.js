import './register.css'

export default function Register() {
    return (
        <div className="register">
            <header></header>
            <div className="register-container">
                <ul className="register-option">
                    <li className="register-option-home">
                        <a href="#">Trang chủ</a>
                        <span>{'>>'}</span>
                    </li>
                    <li className="register-option-login">
                        <a href="#">Đăng ký</a>
                        <span>{'>>'}</span>
                    </li>
                    <li>
                        <p>&nbsp;Đăng ký</p>
                    </li>
                </ul>
                <main>
                    <div className="main-content">
                        <form className="form">
                            <div className="form-header">
                                <div className="form-header-container">
                                    <div className="form-header-content">
                                        <h3>Đăng ký</h3>
                                        <p>Tạo tài khoản ngay</p>
                                    </div>
                                </div>
                            </div>
                            <div className="form-input">
                                <div className="form-input-phone">
                                    <input type="tel" className="input-phone-number" placeholder="MSSV của bạn" autocomplete="nope" />
                                </div>
                                <p className="input-down-invisible"></p>
                            </div>
                            <div className="form-input">
                                <div className="form-input-phone">
                                    <input type="password" className="input-phone-number" placeholder="Mật khẩu ít nhất 8 ký tự" autocomplete="nope" />
                                </div>
                                <div className="form-input-phone-1">
                                    <input type="password" className="input-phone-number" placeholder="Nhập lại mật khẩu" autocomplete="nope" />
                                </div>
                                <p className="input-down-invisible"></p>
                            </div>

                            <button className="btn-normal" type="submit">Đăng ký</button>
                        </form>

                        <div className="register-footer">
                            <p className="register-footer-rules">
                                Bằng việc Đăng ký, bạn đã đồng ý với&nbsp;
                                <a href="https://trogiup.chotot.com/nguoi-ban/hoat-dong/" target="_blank" rel="noreferrer">Điều khoản sử dụng </a>
                                của Library App
                            </p>
                            <p className="register-footer-register">Bạn đã có tài khoản?
                                <a href="/login"> Đăng nhập</a>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
