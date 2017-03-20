(function (global) {
    global.util = {
        toString: function (blob, fn) {

            var reader = new FileReader();
            reader.onload = function (e) {
                fn(e.target.result);
            };
            reader.readAsBinaryString(blob);
        },
        fetchBinaryString: function(url,callback){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.onload = function() {
                callback(this.response);
            };
            xhr.onerror = function() {
                alert('Failed to fetch ' + url);
            };
            xhr.send();
        },
         play: function (floats) {
            var waveData = PCMData.encode({
                sampleRate: 8000,
                channelCount:   1,
                bytesPerSample: 2,
                data: floats
            });

            var element = new Audio();
            element.src = "data:audio/wav;base64,"+btoa(waveData);
            element.play();
        }

        /**
         * @author LearnBoost
         */
        , merge: function (target, additional, deep, lastseen) {
            var seen = lastseen || []
                , depth = typeof deep == 'undefined' ? 2 : deep
                , prop;

            for (prop in additional) {
                if (additional.hasOwnProperty(prop) && seen.indexOf(prop) < 0) {
                    if (typeof target[prop] !== 'object' || !depth) {
                        target[prop] = additional[prop];
                        seen.push(additional[prop]);
                    } else {
                        merge(target[prop], additional[prop], depth - 1, seen);
                    }
                }
            }

            return target;
        }
    }
}(this));