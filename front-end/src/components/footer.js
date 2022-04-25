

export default function Footer() {
   return(
    <footer className="text-center lg:text-left bg-gray-100 text-gray-600">
    
    <div className="mx-6 py-10 text-center md:text-left">
      <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="">
          <h6 className="
              uppercase
              font-semibold
              mb-4
              flex
              items-center
              justify-center
              md:justify-start
            ">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cubes"
              className="w-4 mr-3" role="img" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z">
              </path>
            </svg>
            Rental App
          </h6>
          <p>
           An application for final year project
          </p>
        </div>
        <div className="">
          <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
            Contact
          </h6>
          <p className="flex items-center justify-center md:justify-start mb-4">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope"
              className="w-4 mr-4" role="img" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z">
              </path>
            </svg>
            info@example.com
          </p>
        </div>
      </div>
    </div>
    <div className="text-center p-6 bg-gray-200">
      <span>© 2022 Copyright:</span>
      <a className="text-gray-600 font-semibold" href="https://github.com/Lamthaiduy/rental-final-project">Git Repository</a>
    </div>
  </footer>
   )
}