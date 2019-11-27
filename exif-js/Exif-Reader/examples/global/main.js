/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

(function (window, document) {
    'use strict';

    if (!supportsFileReader()) {
        document.write('<strong>Sorry, your web browser does not support the FileReader API.</strong>');
        return;
    }

    window.addEventListener('load', function () {
        document.getElementById('file').addEventListener('change', handleFile, false);
    }, false);

    function supportsFileReader() {
        return window.FileReader !== undefined;
    }

    function handleFile(event) {
        var files = event.target.files;
        var reader = new FileReader();

        reader.onload = function (readerEvent) {
            try {
                var tags = ExifReader.load(readerEvent.target.result);

                // The MakerNote tag can be really large. Remove it to lower
                // memory usage if you're parsing a lot of files and saving the
                // tags.
                delete tags['MakerNote'];
                if (tags['GPSLatitude']){
                    listTags(tags);
                    popu();
                }
                else {
                    noexif();
                }


            } catch (error) {
                alert(error);
            }
        };

        reader.readAsArrayBuffer(files[0]);
    }

    function listTags(tags) {
        var tableBody;
        var name;
        var row;

        tableBody = document.getElementById('exif-table-body');
        for (name in tags) {
            row = document.createElement('tr');
            row.innerHTML = '<td>' + name + '</td><td>' + tags[name].description + '</td>';
            tableBody.appendChild(row);
        }
    }

    function noexif(){
      var tableBody;
      var name;
      var row;

      tableBody = document.getElementById('exif-table-body');

          row = document.createElement('tr');
          row.innerHTML = '<td> No exif data found</td><td></td>';
          tableBody.appendChild(row);

    }
    function popu(){
      var txt;
      if (confirm("Exif-GPS Data present, Do you want to strip it off?")) {
        gstrip();
      } else {
        txt = "You pressed Cancel!";
        document.getElementById("demo").innerHTML = txt;
      }
    }


})(window, document);
