import { Link } from "react-router-dom";

function ChatContainer() {
  const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_KEY;
  return (
    <div className="chat_wrapper">
      <div className="message sent-message">
        <div className="d-flex flex-column">
          <div className="message-content">
            <p>مرحبا عزيزي محمد احمد</p>
          </div>
          <span className="rec time">03:00 PM</span>
        </div>

        <div className="img">
          <img src="/images/icons/ava.jpg" alt="avatar" />
        </div>
      </div>

      <div className="message received-message">
        <div className="d-flex flex-column">
          <div className="message-content">
            <p>
              م رحبا عزيزي محمد احمرحبا عزيزي محمد احم رحبا عزيزي محمد احم رحبا
              عزيزي محمد احمرحبا عزيزي محمد احمرحبا عزيزي محمد احمرحبا عزيزي
              محمد احمد
            </p>
          </div>
          <span className="sen time">03:00 PM</span>
        </div>

        <div className="img">
          <img src="/images/icons/ava.jpg" alt="avatar" />
        </div>
      </div>

      <div className="message received-message">
        <div className="d-flex flex-column">
          <div className="message-content asset">
            <audio
              src="https://file-examples.com/storage/fea570b16e6703ef79e65b4/2017/11/file_example_MP3_700KB.mp3"
              controls
            ></audio>
          </div>
          <span className="sen time">03:00 PM</span>
        </div>

        <div className="img">
          <img src="/images/icons/ava.jpg" alt="avatar" />
        </div>
      </div>

      <div className="message sent-message">
        <div className="d-flex flex-column">
          <div className="message-content asset">
            <img src="/images/icons/ava.jpg" alt="" />
          </div>
          <span className="rec time">03:00 PM</span>
        </div>

        <div className="img">
          <img src="/images/icons/ava.jpg" alt="avatar" />
        </div>
      </div>

      <div className="message received-message">
        <div className="d-flex flex-column">
          <div className="message-content asset">
            <video
              src="https://file-examples.com/storage/fea570b16e6703ef79e65b4/2017/04/file_example_MP4_480_1_5MG.mp4"
              controls
            ></video>
          </div>
          <span className="sen time">03:00 PM</span>
        </div>

        <div className="img">
          <img src="/images/icons/ava.jpg" alt="avatar" />
        </div>
      </div>

      <div className="message received-message">
        <div className="d-flex flex-column">
          <div className="message-content asset">
            <Link
              className="map_message"
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.google.com/maps?q=37.7749,-122.4194"
            >
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=37.7749,-122.4194&zoom=15&size=300x200&maptype=roadmap&markers=color:red%7Clabel:L%7C37.7749,-122.4194&key=${GOOGLE_KEY}`}
                alt="location"
              />
              <span>Melbourne, Australia</span>
            </Link>
          </div>
          <span className="sen time">03:00 PM</span>
        </div>

        <div className="img">
          <img src="/images/icons/ava.jpg" alt="avatar" />
        </div>
      </div>

      <div className="message sent-message">
        <div className="d-flex flex-column">
          <div className="message-content">
            <div className="contact_card">
              <div className="icon">
                <img src="/images/icons/contact.svg" alt="" />
              </div>
              <div className="content">
                <h6>احمد السيد </h6>
                <h6>01027964469</h6>
              </div>
            </div>
            <Link className="call" to="tel:01027964469">
              اتصال
            </Link>
          </div>
          <span className="rec time">03:00 PM</span>
        </div>

        <div className="img">
          <img src="/images/icons/ava.jpg" alt="avatar" />
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
