import React, { useContext, useState, useEffect } from 'react'
import './Main.css'
import axios from 'axios';
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input, darkMode, toggleDarkMode} = useContext(Context)

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
  
    let greeting;
    if (currentHour < 12) {
      greeting = 'Good morning !';
    } else if (currentHour < 17) {
      greeting = 'Good afternoon !';
    } else {
      greeting = 'Good evening !';
    }

    const handleCardClick = (topic) => {
        setInput(topic);
      };

// IMAGE
const [selectedImage, setSelectedImage] = useState(null); // Add a state to store the selected image
const [imagePreview, setImagePreview] = useState(''); // Add a state to store the image preview

const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]); // Update the state with the selected image
    const reader = new FileReader();
    reader.onload = () => {
        setImagePreview(reader.result); // Update the image preview state
    };
    reader.readAsDataURL(event.target.files[0]);
};

const handleGalleryIconClick = () => {
    document.getElementById('image-input').click(); // Trigger the click event on the input field
};

const handleImageUpload = () => {
    if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);

        // Send the image along with the input text to the server
        axios.post('/upload-image', formData)
            .then((response) => {
                console.log(response);
                // Handle the response
            })
            .catch((error) => {
                console.error(error);
                // Handle the error
            });
    }
};

const handleSend = () => {
    if (input && selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('text', input);

        // Send the image and input text to the server
        axios.post('/generate-response', formData)
            .then((response) => {
                console.log(response);
                // Handle the response
            })
            .catch((error) => {
                console.error(error);
                // Handle the error
            });
    }
};

// image


// MIC RECORDING

const [recording, setRecording] = useState(false);
const [speechText, setSpeechText] = useState('');

const handleMicIconClick = () => {
  if (!recording) {
    startRecording();
  } else {
    stopRecording();
  }
};

const startRecording = () => {
  setRecording(true);
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks = [];
      mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const speechRecognition = new webkitSpeechRecognition();
        speechRecognition.lang = 'en-US';
        speechRecognition.maxResults = 10;
        speechRecognition.onresult = event => {
          const transcript = event.results[0][0].transcript;
          setSpeechText(transcript);
          setInput(transcript);
        };
        speechRecognition.onerror = event => {
          console.error('Error occurred in speech recognition:', event);
        };
        speechRecognition.start();
        speechRecognition.onend = () => {
          mediaRecorder.stop();
        };
      };
    })
    .catch(error => {
      console.error('Error occurred while accessing microphone:', error);
    });
};

const stopRecording = () => {
  setRecording(false);
};

// MIC RECORDING


return (
   
  <div className={`main ${darkMode ? 'dark-mode' : ''}`}>
   
        <div className="nav">
            <p className={`gemini-text ${darkMode ? 'dark-mode-text' : ''}`}>Gemini</p>
            {/* <div className="toggle-switch">
                <input type="checkbox" id="toggle" checked={darkMode} onChange={toggleDarkMode} />
                <label for="toggle">
                    <span></span>
                    <span></span>
                </label>
            </div> */}


            <label class="ui-switch">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <div class="slider">
                <div class="circle"></div>
              </div>
            </label>

        </div> 
       
        <div className="main-container">
       

            {!showResult
            ?<>
            <div className="greet">
                <p><span>{greeting}</span></p>
                <p>How can I help you today ?</p>
            </div>
            <div className="cards">
                <div className="card" onClick={() => handleCardClick('Suggest beautiful places to see on upcoming road trip')}>
                    <p>Suggest beautiful places to see on upcoming road trip</p>
                    <img src={assets.compass_icon} alt='' />
                </div>
                <div className="card"  onClick={() => handleCardClick('Briefly summarise this concept: urban planning')}>
                    <p>Briefly summarise this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt='' />
                </div>
                <div className="card" onClick={() => handleCardClick('Brainstorm team bonding activities for our work work retreat.')}>
                    <p>Brainstorm team bonding activities for our work work retreat.</p>
                    <img src={assets.message_icon} alt='' />
                </div>
                <div className="card" onClick={() => handleCardClick('Give me ways to add certain foods to my diet')}>
                    <p>Give me ways to add certain foods to my diet</p>
                    <img src={assets.code_icon} alt='' />
                </div>
            </div>

            </>
            :<div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt='' />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt='' />
                    {
                    loading?
                    <>
                    <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    </>:
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }    
                </div>
            </div>
            }

            <div className="main-bottom">
                <div className="search-box">
                    {/* <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Type, Talk or Share photo" />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                    </div> */}
                    {/* <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Type, Talk or Share photo" />
                    <div>
                        <img src={assets.gallery_icon} alt="" onClick={handleGalleryIconClick} />
                        <input type="file" id="image-input" onChange={handleImageChange} style={{ display: 'none' }} />
                        <img src={assets.mic_icon} alt="" />
                        {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                    </div> */}

                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Type, Talk or Share photo" />
                    <div>
                    <img src={assets.gallery_icon} alt="" onClick={handleGalleryIconClick} />
                    <input type="file" id="image-input" onChange={handleImageChange} style={{ display: 'none' }} />
                    <img src={assets.mic_icon} alt="" onClick={handleMicIconClick} />
                     
                     {input ? <img onClick={() => onSent()} src={assets.send_icon} alt=""  /> : null}
                     </div>
                </div>
                <p className='bottom-info'>Gemini may display inaccurate info, including about people, so double check its responses.</p>
            </div>
            
        </div>
       
    </div>
  )
}

export default Main
