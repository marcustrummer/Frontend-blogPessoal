var myExtObject = (function() {

  return {
    tananan: function getCoord(e) {
      var carPos = email.selectionEnd,
        div = document.createElement("div"),
        span = document.createElement("span"),
        copyStyle = getComputedStyle(email),
        emailCoords = {},
        caretCoords = {},
        centerCoords = {};
      [].forEach.call(copyStyle, function (prop) {
        div.style[prop] = copyStyle[prop];
      });
      div.style.position = "absolute";
      document.body.appendChild(div);
      div.textContent = email.value.substr(0, carPos);
      span.textContent = email.value.substr(carPos) || ".";
      div.appendChild(span);
    
      emailCoords = getPosition(email); //console.log("emailCoords.x: " + emailCoords.x + ", emailCoords.y: " + emailCoords.y);
      caretCoords = getPosition(span); //console.log("caretCoords.x " + caretCoords.x + ", caretCoords.y: " + caretCoords.y);
      centerCoords = getPosition(mySVG); //console.log("centerCoords.x: " + centerCoords.x);
      svgCoords = getPosition(mySVG);
      screenCenter = centerCoords.x + mySVG.offsetWidth / 2; //console.log("screenCenter: " + screenCenter);
      caretPos = caretCoords.x + emailCoords.x; //console.log("caretPos: " + caretPos);
    
      dFromC = screenCenter - caretPos; //console.log("dFromC: " + dFromC);
      var pFromC = Math.round((caretPos / screenCenter) * 100) / 100;
      if (pFromC < 1) {
      } else if (pFromC > 1) {
        pFromC -= 2;
        pFromC = Math.abs(pFromC);
      }
    
      eyeDistH = -dFromC * 0.05;
      if (eyeDistH > eyeMaxHorizD) {
        eyeDistH = eyeMaxHorizD;
      } else if (eyeDistH < -eyeMaxHorizD) {
        eyeDistH = -eyeMaxHorizD;
      }
    
      var eyeLCoords = { x: svgCoords.x + 84, y: svgCoords.y + 76 };
      var eyeRCoords = { x: svgCoords.x + 113, y: svgCoords.y + 76 };
      var noseCoords = { x: svgCoords.x + 97, y: svgCoords.y + 81 };
      var mouthCoords = { x: svgCoords.x + 100, y: svgCoords.y + 100 };
      var eyeLAngle = getAngle(
        eyeLCoords.x,
        eyeLCoords.y,
        emailCoords.x + caretCoords.x,
        emailCoords.y + 25
      );
      var eyeLX = Math.cos(eyeLAngle) * eyeMaxHorizD;
      var eyeLY = Math.sin(eyeLAngle) * eyeMaxVertD;
      var eyeRAngle = getAngle(
        eyeRCoords.x,
        eyeRCoords.y,
        emailCoords.x + caretCoords.x,
        emailCoords.y + 25
      );
      var eyeRX = Math.cos(eyeRAngle) * eyeMaxHorizD;
      var eyeRY = Math.sin(eyeRAngle) * eyeMaxVertD;
      var noseAngle = getAngle(
        noseCoords.x,
        noseCoords.y,
        emailCoords.x + caretCoords.x,
        emailCoords.y + 25
      );
      var noseX = Math.cos(noseAngle) * noseMaxHorizD;
      var noseY = Math.sin(noseAngle) * noseMaxVertD;
      var mouthAngle = getAngle(
        mouthCoords.x,
        mouthCoords.y,
        emailCoords.x + caretCoords.x,
        emailCoords.y + 25
      );
      var mouthX = Math.cos(mouthAngle) * noseMaxHorizD;
      var mouthY = Math.sin(mouthAngle) * noseMaxVertD;
      var mouthR = Math.cos(mouthAngle) * 6;
      var chinX = mouthX * 0.8;
      var chinY = mouthY * 0.5;
      var chinS = 1 - (dFromC * 0.15) / 100;
      if (chinS > 1) {
        chinS = 1 - (chinS - 1);
      }
      var faceX = mouthX * 0.3;
      var faceY = mouthY * 0.4;
      var faceSkew = Math.cos(mouthAngle) * 5;
      var eyebrowSkew = Math.cos(mouthAngle) * 25;
      var outerEarX = Math.cos(mouthAngle) * 4;
      var outerEarY = Math.cos(mouthAngle) * 5;
      var hairX = Math.cos(mouthAngle) * 6;
      var hairS = 1.2;
    
      TweenMax.to(eyeL, 1, { x: -eyeLX, y: -eyeLY, ease: Expo.easeOut });
      TweenMax.to(eyeR, 1, { x: -eyeRX, y: -eyeRY, ease: Expo.easeOut });
      TweenMax.to(nose, 1, {
        x: -noseX,
        y: -noseY,
        rotation: mouthR,
        transformOrigin: "center center",
        ease: Expo.easeOut,
      });
      TweenMax.to(mouth, 1, {
        x: -mouthX,
        y: -mouthY,
        rotation: mouthR,
        transformOrigin: "center center",
        ease: Expo.easeOut,
      });
      TweenMax.to(chin, 1, {
        x: -chinX,
        y: -chinY,
        scaleY: chinS,
        ease: Expo.easeOut,
      });
      TweenMax.to(face, 1, {
        x: -faceX,
        y: -faceY,
        skewX: -faceSkew,
        transformOrigin: "center top",
        ease: Expo.easeOut,
      });
      TweenMax.to(eyebrow, 1, {
        x: -faceX,
        y: -faceY,
        skewX: -eyebrowSkew,
        transformOrigin: "center top",
        ease: Expo.easeOut,
      });
      TweenMax.to(outerEarL, 1, {
        x: outerEarX,
        y: -outerEarY,
        ease: Expo.easeOut,
      });
      TweenMax.to(outerEarR, 1, { x: outerEarX, y: outerEarY, ease: Expo.easeOut });
      TweenMax.to(earHairL, 1, {
        x: -outerEarX,
        y: -outerEarY,
        ease: Expo.easeOut,
      });
      TweenMax.to(earHairR, 1, { x: -outerEarX, y: outerEarY, ease: Expo.easeOut });
      TweenMax.to(hair, 1, {
        x: hairX,
        scaleY: hairS,
        transformOrigin: "center bottom",
        ease: Expo.easeOut,
      });
    
      document.body.removeChild(div);
    },
    tananan2: function onEmailInput(e) {
      getCoord(e);
      var value = e.target.value;
      curEmailIndex = value.length;
    
      // very crude email validation for now to trigger effects
      if (curEmailIndex > 0) {
        if (mouthStatus == "small") {
          mouthStatus = "medium";
          TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {
            morphSVG: mouthMediumBG,
            shapeIndex: 8,
            ease: Expo.easeOut,
          });
          TweenMax.to(tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
          TweenMax.to(tongue, 1, { x: 0, y: 1, ease: Expo.easeOut });
          TweenMax.to([eyeL, eyeR], 1, {
            scaleX: 0.85,
            scaleY: 0.85,
            ease: Expo.easeOut,
          });
        }
        if (value.includes("@")) {
          mouthStatus = "large";
          TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {
            morphSVG: mouthLargeBG,
            ease: Expo.easeOut,
          });
          TweenMax.to(tooth, 1, { x: 3, y: -2, ease: Expo.easeOut });
          TweenMax.to(tongue, 1, { y: 2, ease: Expo.easeOut });
          TweenMax.to([eyeL, eyeR], 1, {
            scaleX: 0.65,
            scaleY: 0.65,
            ease: Expo.easeOut,
            transformOrigin: "center center",
          });
        } else {
          mouthStatus = "medium";
          TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {
            morphSVG: mouthMediumBG,
            ease: Expo.easeOut,
          });
          TweenMax.to(tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
          TweenMax.to(tongue, 1, { x: 0, y: 1, ease: Expo.easeOut });
          TweenMax.to([eyeL, eyeR], 1, {
            scaleX: 0.85,
            scaleY: 0.85,
            ease: Expo.easeOut,
          });
        }
      } else {
        mouthStatus = "small";
        TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {
          morphSVG: mouthSmallBG,
          shapeIndex: 9,
          ease: Expo.easeOut,
        });
        TweenMax.to(tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
        TweenMax.to(tongue, 1, { y: 0, ease: Expo.easeOut });
        TweenMax.to([eyeL, eyeR], 1, { scaleX: 1, scaleY: 1, ease: Expo.easeOut });
      }
    }
  }

})(myExtObject||{})


var webGlObject = (function() { 
  return { 
    init: function() { 
      alert('webGlObject initialized');
    } 
  } 
})(webGlObject||{})