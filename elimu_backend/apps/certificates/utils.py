"""
Certificate Generation Utilities
"""

import io
import cloudinary
import cloudinary.uploader
from django.template.loader import render_to_string
from django.utils import timezone
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration


def generate_certificate_html(certificate):
    """
    Generate HTML for certificate using template
    """
    from .models import CertificateTemplate
    
    # Get default template
    template = CertificateTemplate.objects.filter(is_default=True, is_active=True).first()
    
    if not template:
        # Use default template
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                @page {{
                    size: A4 landscape;
                    margin: 0;
                }}
                body {{
                    margin: 0;
                    padding: 0;
                    font-family: 'Georgia', serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }}
                .certificate {{
                    background: white;
                    width: 90%;
                    max-width: 1000px;
                    padding: 60px;
                    border: 20px solid #F97316;
                    border-radius: 20px;
                    text-align: center;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                }}
                .logo {{
                    width: 150px;
                    margin-bottom: 20px;
                }}
                .title {{
                    font-size: 48px;
                    color: #0D3B66;
                    margin: 20px 0;
                    font-weight: bold;
                }}
                .subtitle {{
                    font-size: 24px;
                    color: #666;
                    margin-bottom: 40px;
                }}
                .student-name {{
                    font-size: 56px;
                    color: #F97316;
                    font-weight: bold;
                    margin: 30px 0;
                    text-transform: uppercase;
                }}
                .course-title {{
                    font-size: 32px;
                    color: #0D3B66;
                    margin: 20px 0;
                    font-style: italic;
                }}
                .completion-text {{
                    font-size: 20px;
                    color: #666;
                    margin: 30px 0;
                    line-height: 1.6;
                }}
                .signature-section {{
                    display: flex;
                    justify-content: space-around;
                    margin-top: 60px;
                }}
                .signature {{
                    text-align: center;
                }}
                .signature-line {{
                    border-top: 2px solid #333;
                    width: 200px;
                    margin: 10px auto;
                }}
                .signature-name {{
                    font-size: 18px;
                    font-weight: bold;
                    margin-top: 10px;
                }}
                .signature-title {{
                    font-size: 14px;
                    color: #666;
                }}
                .footer {{
                    margin-top: 40px;
                    font-size: 12px;
                    color: #999;
                }}
                .certificate-id {{
                    font-size: 14px;
                    color: #999;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class="certificate">
                <div class="title">CERTIFICATE OF COMPLETION</div>
                <div class="subtitle">This is to certify that</div>
                
                <div class="student-name">{certificate.student_name}</div>
                
                <div class="completion-text">
                    has successfully completed the course
                </div>
                
                <div class="course-title">{certificate.course_title}</div>
                
                <div class="completion-text">
                    Awarded on {certificate.completion_date.strftime('%B %d, %Y')}
                </div>
                
                <div class="signature-section">
                    <div class="signature">
                        <div class="signature-line"></div>
                        <div class="signature-name">{certificate.instructor_name}</div>
                        <div class="signature-title">Course Instructor</div>
                    </div>
                    <div class="signature">
                        <div class="signature-line"></div>
                        <div class="signature-name">Elimu Space</div>
                        <div class="signature-title">Platform Director</div>
                    </div>
                </div>
                
                <div class="footer">
                    <div>Elimu Space - Empowering Tanzanian Youth</div>
                    <div class="certificate-id">Certificate ID: {certificate.certificate_id}</div>
                    <div>Verification Code: {certificate.verification_code}</div>
                </div>
            </div>
        </body>
        </html>
        """
    else:
        # Use custom template
        html_content = template.html_template.format(
            student_name=certificate.student_name,
            course_title=certificate.course_title,
            instructor_name=certificate.instructor_name,
            completion_date=certificate.completion_date.strftime('%B %d, %Y'),
            certificate_id=certificate.certificate_id,
            verification_code=certificate.verification_code
        )
    
    return html_content


def generate_certificate_pdf(certificate):
    """
    Generate PDF certificate using WeasyPrint
    Returns PDF bytes
    """
    html_content = generate_certificate_html(certificate)
    
    # Configure fonts
    font_config = FontConfiguration()
    
    # Generate PDF
    pdf_bytes = HTML(string=html_content).write_pdf(font_config=font_config)
    
    return pdf_bytes


def upload_to_cloudinary(pdf_bytes, certificate):
    """
    Upload PDF to Cloudinary
    Returns Cloudinary URL
    """
    try:
        # Upload PDF to Cloudinary
        upload_result = cloudinary.uploader.upload(
            pdf_bytes,
            resource_type='raw',
            folder='elimu_space/certificates',
            public_id=f"cert_{certificate.certificate_id}",
            format='pdf',
            overwrite=True
        )
        
        return upload_result['secure_url'], upload_result['public_id']
    except Exception as e:
        raise Exception(f"Cloudinary upload failed: {str(e)}")


def generate_and_upload_certificate(certificate):
    """
    Main function to generate PDF and upload to Cloudinary
    Updates certificate object with file_url
    """
    try:
        # Update status
        certificate.status = 'processing'
        certificate.save()
        
        # Generate PDF
        pdf_bytes = generate_certificate_pdf(certificate)
        
        # Upload to Cloudinary
        file_url, public_id = upload_to_cloudinary(pdf_bytes, certificate)
        
        # Update certificate
        certificate.file_url = file_url
        certificate.cloudinary_public_id = public_id
        certificate.status = 'completed'
        certificate.save()
        
        return certificate
    
    except Exception as e:
        certificate.status = 'failed'
        certificate.error_message = str(e)
        certificate.save()
        raise

