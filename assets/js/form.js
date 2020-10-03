$(document).ready(function(){
  $('.datepicker').datepicker({
    autoClose: true,
    onClose: () => {
      const startDate = $('#start-date').parsley();
      const endDate = $('#end-date').parsley();

      if (startDate && startDate.isValid()) {
        startDate.reset();
      }

      if (endDate && endDate.isValid()) {
        endDate.reset();
      }
    }
  });

  window.Parsley && window.Parsley
    .addValidator('checkEndDate', {
      requirementType: 'string',
      validateString: (endDateFieldValue, startDateFieldId) => {
        const startDateFieldValue = $(startDateFieldId).val();

        if (endDateFieldValue && startDateFieldValue) {
          const eDate = new Date(endDateFieldValue);
          const sDate = new Date(startDateFieldValue);

          return sDate <= eDate;
        }

        return false;
      },
      messages: {
        en: 'Choose a date passed Start Date'
      }
    });
});
