class Validator {
    static validateInput(input) {
      if (!input || input.trim() === '') {
        return false;
      }
      return true;
    }
  }
  