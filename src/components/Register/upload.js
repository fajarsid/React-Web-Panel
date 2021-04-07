import React, { Component } from "react";
import app from "../firebase";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0
    };
  }
  copyCodeToClipboard = () => {
    const el = this.textArea
    el.select()
    document.execCommand("copy")
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = app.getUpload().ref(`calon/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        console.log(error);
      },
      () => {
        app.getUpload()
          .ref("calon")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
    );
  };
  render() {
    return (
      <div className="center">
          <h2 className="green-text">Upload Foto Calon</h2>
          <textarea
            ref={(textarea) => this.textArea = textarea}
            value={this.state.url}
          />
        <div className="row">
          <progress value={this.state.progress} max="100" className="progress" />
        </div>
        <div className="file-field input-field">
          <div className="btn">
            <input type="file" onChange={this.handleChange} />
          </div>
        </div>
        <button
          onClick={this.handleUpload}
          className="waves-effect waves-light btn"
        >
          Upload
        </button>
        <br />
        <br />
        <img
          src={this.state.url || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="100"
          width="100"
        />
        <br />
        <br />
         <button
          onClick= {() => this.copyCodeToClipboard()}
          className="waves-effect waves-light btn"
        >
          Copy Foto
        </button>
      </div>
    );
  }
}

export default ImageUpload;