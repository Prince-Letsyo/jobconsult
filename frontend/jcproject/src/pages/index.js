
import Jobs from '@/components/views/Jobs/Jobs'
import { useGetJobApprovalQuery } from '@/store/features/jobApprovalSlice'
import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'

export default function Home() {
  const {
    data: jobApprovalList,
    isSuccess: jobApprovalListIsSuccess,
    isLoading: jobApprovalListIsLoading,
  } = useGetJobApprovalQuery()

  useEffect(() => {
    return () => {}
  }, [jobApprovalList])
  return (
    <div className="landing_page">
      <div className="hero-container">
        <div className="hero-over"></div>
        <div className="hero-image" />
      </div>
      <section className="search-job">
        <div className="search-job-title title">
          <h3>Explore and discover the right job for you!</h3>
        </div>
        <div>
          {!jobApprovalListIsLoading ? (
            <div>
              {jobApprovalListIsSuccess ? (
                <div>
                  {jobApprovalList.data.length > 0 ? (
                    <Jobs
                      homePage={false}
                      jobApprovalList={jobApprovalList.data.slice(0, 3)}
                    />
                  ) : (
                    <div>No Jobs available</div>
                  )}
                </div>
              ) : (
                <div>No Jobs available</div>
              )}
            </div>
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">fetching jobs...</span>
            </Spinner>
          )}
        </div>
      </section>
      <section className="features-job">
        <div className="features-job-title title">
          <h3>Find the right job vacancies in Ghana</h3>
        </div>
      </section>
      <section className="about-section">
        <div className="features-job-title title">
          <div className="features-job-title title">
            <h3>Find the right job vacancies in Ghana</h3>
          </div>
          <div className="about-msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem. Veritatis obcaecati tenetur iure
              eius earum ut molestias architecto voluptate aliquam nihil,
              eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
              tenetur error, harum nesciunt ipsum debitis quas aliquid.
              Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa
              laudantium molestias eos sapiente officiis modi at sunt excepturi
              expedita sint? Sed quibusdam recusandae alias error harum maxime
              adipisci amet laborum.{' '}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
