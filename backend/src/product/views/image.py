from django.views.generic.edit import FormView
from product.forms import FileFieldForm

# @csrf_exempt
class ImageUploadView(FormView):
    form_class = FileFieldForm
    template_name = 'upload.html'
    success_url = '/product/upload'

    def post(self, request, *args, **kwargs):
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        files = request.FILES.getlist('files')

        if form.is_valid():



            for f in files:
                print(f)
                print(f.__dict__)

            #handle_uploaded_file(request.FILES['files'])

            return self.form_valid(form)
        else:
            return self.form_invalid(form)

