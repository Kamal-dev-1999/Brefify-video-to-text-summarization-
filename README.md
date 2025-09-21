
# 🎯 Briefify - AI-Powered Meeting Summarization Platform

<div align="center">

![Briefify Logo](statics/img/logo.png)

[![Python](https://img.shields.io/badge/Python-3.7+-blue.svg)](https://python.org)
[![Django](https://img.shields.io/badge/Django-5.1.3-green.svg)](https://djangoproject.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

*Transform your meetings into actionable insights with AI-powered transcription and summarization*

[🚀 Live Demo](#demo) • [📖 Documentation](#documentation) • [🛠️ Installation](#installation) • [🤝 Contributing](#contributing)

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [✨ Key Features](#key-features)
- [🏗️ Architecture](#architecture)
- [🛠️ Technology Stack](#technology-stack)
- [⚡ Installation Guide](#installation-guide)
- [🔧 Configuration](#configuration)
- [📚 Usage Guide](#usage-guide)
- [🎯 API Documentation](#api-documentation)
- [🧪 Testing](#testing)
- [🚀 Deployment](#deployment)
- [🤝 Contributing](#contributing)
- [📄 License](#license)
- [👥 Authors](#authors)
- [📞 Support](#support)

## 🎯 Overview

**Briefify** is a cutting-edge web application that revolutionizes meeting management by automatically converting audio/video recordings into comprehensive summaries, actionable insights, and multilingual translations. Built with Django and powered by state-of-the-art AI models, Briefify streamlines the post-meeting workflow for teams, organizations, and individuals.

### 🎪 Demo

https://user-images.githubusercontent.com/95146047/230769738-aad4f6d1-f5aa-44d4-9465-0e872d1d9df0.mp4

### 🌟 Why Briefify?

- **⏰ Save Time**: Reduce hours of manual note-taking to minutes of automated processing
- **🎯 Extract Value**: Identify key action items and decisions automatically
- **🌍 Global Accessibility**: Translate summaries into multiple languages
- **📊 Data-Driven**: Track meeting metrics and improve productivity
- **🔐 Secure**: Enterprise-grade security for sensitive meeting content

## ✨ Key Features

### 🎵 Core AI Capabilities

- Duration of the meeting.

- Action list within the transcript.

- Summary of the meet.

- Summary translation in any globally scripted language.

- Storage functionalities for previous video uploads and the previous generated summaries.

- Chat Bot that helps the user to understand the website.

- Open source


## Demo

https://user-images.githubusercontent.com/95146047/230769738-aad4f6d1-f5aa-44d4-9465-0e872d1d9df0.mp4


## Web app

#### Front End:
- HTML
- CSS
- JavaScript

This website is not responsive. It was built according to `1500 X 745` dimesion.


#### Back End

- Django
- SQL3lite

This was built on Django version`3.2.18`


## Libraries used:

In order to run this project you will need the following Libraries.

 1. ffmpeg

 2. PyTorch

 3. CUDA

 4. Whisper

 5. Transformers

 6. BART CNN 12-6

 7. SubProcess

 8. NLTK

  


## Downloads

This project is built on Django and python 3.7. It requires having a Nvidida graphic card since it utilizes CUDA. So, having these prequisites will help run the project better.

[Python 3.7](https://www.filepuma.com/download/python_64bit_3.7.0-19300/)


[ffmpeg](https://github.com/BtbN/FFmpeg-Builds/releases)

[PyTorch](https://pytorch.org/)

[CUDA](https://developer.nvidia.com/cuda-11-6-0-download-archive/)













## Installations

Install the prequisites.

1. Whisper:
```bash
pip install -U openai-whisper
pip install git+https://github.com/openai/whisper.git 
```
   

2. Transformers:
```bash
pip install transformers
pip install transformers-sentencepiece
```
3. Numpy & Rust:
```bash
pip install numpy==1.23.5
pip install setuptools-rust
```

3. NLTK:
```bash
pip install nltk
```

4. Django:
```bash
pip install django
```



 
## Working

![Working](https://user-images.githubusercontent.com/95146047/230765096-affb24db-531e-4620-8b07-18d553b667ad.png)
## Authors

- [@Parikshit-007](https://github.com/Parikshit-007)
- [@AakashSingh20](https://github.com/AakashSingh20)

